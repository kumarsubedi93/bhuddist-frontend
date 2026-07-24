
'use client'

import { Tab } from '@/lib/types';
import Link from 'next/link';
import React, { useState } from 'react';



const Tabs: React.FC<{tabs : Tab[] , currentTab : string}> = ({tabs , currentTab}) => {
    const [activeTab, setActiveTab] = useState<string>(currentTab);

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <div className="text-base font-medium text-center text-gray-500 border-b border-gray-200 flex-1">
            <ul className="flex flex-wrap -mb-px mt-4">
                {tabs.map((tab, index) => (
                    <li key={index} className="me-2">
                        <Link
                            prefetch={true}
                            href={tab.href}
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                activeTab === tab.href
                                    ? 'text-blue-600 border-blue-600'
                                    : 'border-transparent hover:text-gray-600'
                            }`}
                            onClick={() => handleTabClick(tab.href)}
                        >
                            {tab.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tabs;
