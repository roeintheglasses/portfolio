'use client';

import { useCallback } from 'react';
import {
  IconPhoto,
  IconPencil,
  IconSparkles,
  IconEye,
  IconRocket,
  IconArrowRight,
  IconArrowLeft,
  IconLoader2,
} from '@tabler/icons-react';
import { useCreateStoryStore, type CreationStep } from '@/store/createStoryStore';
import PhotoUploader from './PhotoUploader';
import PhotoGrid from './PhotoGrid';
import ContextInput from './ContextInput';
import GalleryPreview from './GalleryPreview';
import PublishDialog from './PublishDialog';

const STEPS: { key: CreationStep; label: string; icon: React.ReactNode }[] = [
  { key: 'upload', label: 'Upload', icon: <IconPhoto className="h-4 w-4" /> },
  { key: 'context', label: 'Context', icon: <IconPencil className="h-4 w-4" /> },
  { key: 'generate', label: 'Generate', icon: <IconSparkles className="h-4 w-4" /> },
  { key: 'preview', label: 'Preview', icon: <IconEye className="h-4 w-4" /> },
  { key: 'publish', label: 'Publish', icon: <IconRocket className="h-4 w-4" /> },
];

interface CreateStoryFormProps {
  onGenerateContent: () => Promise<void>;
  onPublish: (options: { published: boolean; featured: boolean }) => Promise<string | null>;
}

export default function CreateStoryForm({ onGenerateContent, onPublish }: CreateStoryFormProps) {
  const { step, setStep, photos, metadata, isExtracting, isGenerating, error } =
    useCreateStoryStore();

  const currentStepIndex = STEPS.findIndex((s) => s.key === step);

  const canProceed = useCallback(() => {
    switch (step) {
      case 'upload':
        return photos.length > 0 && !isExtracting;
      case 'context':
        return metadata.title.trim() !== '' && metadata.locationName.trim() !== '';
      case 'generate':
        return !isGenerating;
      case 'preview':
        return true;
      case 'publish':
        return true;
      default:
        return false;
    }
  }, [step, photos, metadata, isExtracting, isGenerating]);

  const handleNext = async () => {
    if (!canProceed()) return;

    const nextIndex = currentStepIndex + 1;
    const nextStep = STEPS[nextIndex];
    if (nextStep) {
      // Handle generation step
      if (step === 'context') {
        setStep('generate');
        await onGenerateContent();
        setStep('preview');
      } else {
        setStep(nextStep.key);
      }
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    const prevStep = STEPS[prevIndex];
    if (prevStep) {
      setStep(prevStep.key);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progress steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <button
                onClick={() => i < currentStepIndex && setStep(s.key)}
                disabled={i > currentStepIndex}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  s.key === step
                    ? 'bg-indigo-600 text-white'
                    : i < currentStepIndex
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-800/50 text-gray-500'
                }`}
              >
                {s.icon}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-0.5 w-8 ${
                    i < currentStepIndex ? 'bg-indigo-600' : 'bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Step content */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        {step === 'upload' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Upload Photos</h2>
              <p className="mt-1 text-sm text-gray-400">
                Add your photos to start creating your story. EXIF data will be extracted
                automatically.
              </p>
            </div>
            <PhotoUploader />
            {isExtracting && (
              <div className="flex items-center gap-2 text-sm text-indigo-400">
                <IconLoader2 className="h-4 w-4 animate-spin" />
                Extracting EXIF data...
              </div>
            )}
            <PhotoGrid />
          </div>
        )}

        {step === 'context' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Add Context</h2>
              <p className="mt-1 text-sm text-gray-400">
                Provide details about your story to help generate a compelling narrative.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <ContextInput />
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
                <h3 className="mb-4 text-sm font-medium text-gray-300">Photos Preview</h3>
                <PhotoGrid showCaptions />
              </div>
            </div>
          </div>
        )}

        {step === 'generate' && (
          <div className="flex flex-col items-center justify-center py-12">
            <IconLoader2 className="h-12 w-12 animate-spin text-indigo-500" />
            <h2 className="mt-4 text-xl font-semibold text-white">Generating Your Story</h2>
            <p className="mt-2 text-sm text-gray-400">
              Using AI to craft a narrative for your photo story...
            </p>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Preview Gallery</h2>
              <p className="mt-1 text-sm text-gray-400">Review your photos and edit the summary.</p>
            </div>
            <GalleryPreview />
          </div>
        )}

        {step === 'publish' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Publish Your Story</h2>
              <p className="mt-1 text-sm text-gray-400">
                Review your settings and publish to Stories.
              </p>
            </div>
            <PublishDialog onPublish={onPublish} />
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      {step !== 'publish' && step !== 'generate' && (
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {step === 'context' ? 'Generate Story' : 'Continue'}
            <IconArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
