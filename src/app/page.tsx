'use client';
import { Theme } from '@radix-ui/themes';
import Page from './screens/pokemon/page';

export default function Home() {

  return (
    <Theme appearance="light" accentColor="gray">
      <main style={{background: 'var(--background)'}} className="flex h-screen w-screen overflow-hidden">
        <Page></Page>
      </main>
    </Theme>
  )
}