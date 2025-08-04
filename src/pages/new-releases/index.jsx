import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import PlayerBar from '../../components/ui/PlayerBar';
import NewReleasesSection from '../home-dashboard/components/NewReleasesSection';

const NewReleasesPage = () => {
  return (
    <>
      <Helmet>
        <title>New Releases - HarmonyStream</title>
        <meta name="description" content="Discover the latest music releases on HarmonyStream." />
        <meta name="keywords" content="new releases, music, albums, singles, HarmonyStream" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Navigation />

        <main className="pt-[120px] md:pt-[140px] pb-[160px] md:pb-[120px] px-4 lg:px-6 max-w-7xl mx-auto">
          <NewReleasesSection />
        </main>

        <PlayerBar />
      </div>
    </>
  );
};

export default NewReleasesPage;
