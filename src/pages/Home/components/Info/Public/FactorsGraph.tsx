import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import { Other } from '../../../service';
import ReactMarkdown from 'react-markdown';

interface Section {
    title: string;
    children?: Section[];
}

export default function CompanyContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Section | null>(null);

    const parseData = (input: string): Section[] => {
        const lines = input.split('\n').filter(line => line.trim().length > 0);
        const sections: Section[] = [];

        let currentLevel = 0;
        let currentSection: Section | null = null;

        for (const line of lines) {
            const level = line.indexOf('- ');
            if (level === -1) continue; // 跳过无效行

            if (level > currentLevel) {
                if (!currentSection) {
                    currentSection = { title: line.substring(level + 2).trim(), children: [] };
                    sections.push(currentSection);
                } else {
                    const newSection = { title: line.substring(level + 2).trim(), children: [] };
                    currentSection.children.push(newSection);
                    currentSection = newSection;
                }
            } else if (level < currentLevel) {
                while (level < currentLevel) {
                    currentSection = currentSection?.parent;
                    currentLevel--;
                }
                currentSection = { title: line.substring(level + 2).trim(), children: [] };
                sections.push(currentSection);
            } else {
                const newSection = { title: line.substring(level + 2).trim(), children: [] };
                if (currentSection) {
                    currentSection.children.push(newSection);
                    currentSection = newSection;
                } else {
                    sections.push(newSection);
                    currentSection = newSection;
                }
            }

            currentLevel = level;
        }

        return sections;
    };

    // const fetchStockData = async () => {
    //     try {
    //         const response = await Other.getgraph();
    //         const parsedData = parseData(response);
    //         setData(parsedData[0]);
    //         console.log(parsedData, 'parsedData');
    //     } catch (error) {
    //         console.error('Fetch data error:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const fetchStockData = async () => {
        try {
            const response = await Other.getgraph();
            const parsedData = parseData(response);
            setData(response);
            console.log(parsedData, 'parsedData');
        } catch (error) {
            console.error('Fetch data error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStockData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div >
            {/* <SectionComponent section={data} /> */}
            <ReactMarkdown>
                {data}
            </ReactMarkdown>
        </div>
    );
}

const SectionComponent = ({ section }: { section: Section }) => {
    return (
        <div>
            <h2>{section.title}</h2>
            {section.children?.map((childSection, index) => (
                <SubsectionComponent key={index} section={childSection} />
            ))}
        </div>
    );
};

const SubsectionComponent = ({ section }: { section: Section }) => {
    return (
        <div>
            <h3>{section.title}</h3>
            {section.children?.map((subSection, index) => (
                <SubsectionComponent key={index} section={subSection} />
            ))}
        </div>
    );
};