import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import Link from 'next/link';
import Image from 'next/future/image';
import { HiSun, HiMoon } from 'react-icons/hi'

import Container from 'components/Container';


export default function Timeline() {
    return (
        <Container title="Timeline - Hrishikesh Jangir">
            <VerticalTimeline lineColor={'white'}>
                <VerticalTimelineElement
                    className=""
                    contentStyle={{ background: 'rgb(42, 44, 45)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(42, 44, 45)' }}
                    date="2022 - present"
                    iconStyle={{ background: 'rgb(42, 44, 45)', color: '#fff' }}
                    icon={<HiSun />}
                >
                    <h3 className="text-2xl">Adpushup</h3>
                    <h4 className="text-l">SDE Team Lead - Instream</h4>
                    <p>
                        Team lead for instream video development
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className=""
                    date="2021 - 2022"
                    contentStyle={{ background: 'rgb(42, 44, 45)', color: '#fff' }}
                    iconStyle={{ background: 'rgb(42, 44, 45)', color: '#fff' }}
                    icon={<HiSun />}
                >
                    <h3 className="text-2xl">Adpushup</h3>
                    <h4 className="text-l">Software Development Engineer</h4>
                    <p>
                        SDE at Adpushup
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className=""
                    date="2020 - 2021"
                    contentStyle={{ background: 'rgb(42, 44, 45)', color: '#fff' }}
                    iconStyle={{ background: 'rgb(42, 44, 45)', color: '#fff' }}
                    icon={<HiSun />}
                >
                    <h3 className="text-2xl">QuikieApps</h3>
                    <h4 className="text-l">Full Stack Developer</h4>
                    <p>
                        Developer
                    </p>
                </VerticalTimelineElement>
            </VerticalTimeline>
        </Container>
    );
}





