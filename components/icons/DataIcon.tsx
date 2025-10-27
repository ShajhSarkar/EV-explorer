
import React from 'react';

export const DataIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-2.25a.75.75 0 00-.75-.75h-4.5a.75.75 0 00-.75.75v2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
);
