import * as React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, ContextOptions } from '..';
export declare function renderWithClient(client: QueryClient, ui: React.ReactElement, options?: ContextOptions): ReturnType<typeof render>;
export declare const Blink: ({ duration, children, }: {
    duration: number;
    children: React.ReactNode;
}) => JSX.Element;
