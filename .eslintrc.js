/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  rules: {
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    // For use in edge API routes
    '@next/next/no-server-import-in-page': 'off',
    // TypeScript-specific rules
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn'
  },
  overrides: [
    {
      files: ['pages/api/**/*.ts'],
      rules: {
        '@next/next/no-server-import-in-page': 'off'
      }
    }
  ]
};
