'use client';

import GlobalBackground3D from './GlobalBackground3D';
import AIAssistant from '../Sections/AIAssistant';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalBackground3D />
      {children}
      <AIAssistant />
    </>
  );
}
