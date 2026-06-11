import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Hero } from "@/components/sections/hero";
import { Pillars } from "@/components/sections/pillars";
import { Introduction } from "@/components/sections/introduction";
import { Movement } from "@/components/sections/movement";
import { Despierta } from "@/components/sections/despierta";
import { CommunityNext } from "@/components/sections/community-next";
import { Speaking } from "@/components/sections/speaking";
import { Library } from "@/components/sections/library";
import { Recognition } from "@/components/sections/recognition";
import { Witness } from "@/components/sections/witness";
import { Insights } from "@/components/sections/insights";
import { Podcast } from "@/components/sections/podcast";
import { Social } from "@/components/sections/social";
import { Newsletter } from "@/components/sections/newsletter";

type Params = Promise<{ locale: string }>;

export default async function HomePage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict.hero} />
      <Pillars dict={dict.pillars} />
      <Introduction locale={locale} dict={dict.introduction} />
      <Movement locale={locale} dict={dict.movement} />
      <Podcast dict={dict.podcast} />
      <Despierta locale={locale} dict={dict.despierta} />
      <CommunityNext dict={dict.communityNext} />
      <Speaking dict={dict.speakingHome} />
      <Library dict={dict.library} />
      <Recognition dict={dict.recognitionHome} honorTitles={dict.honors.titles} />
      <Witness dict={dict.witness} />
      <Insights locale={locale} dict={dict.insightsHome} />
      <Social dict={dict.social} />
      <Newsletter dict={dict.newsletter} />
    </>
  );
}
