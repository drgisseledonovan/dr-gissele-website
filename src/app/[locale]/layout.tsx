import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  LOCALES,
  getDictionary,
  isLocale,
  type Locale,
} from "@/lib/i18n";

/* /[locale] layout — wraps every localized page with the bilingual
   Nav and Footer. Reads the locale param so child pages and chrome
   components share the same dictionary. */

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export default async function LocaleLayout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <Nav locale={locale as Locale} dict={dict.nav} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} dict={dict.footer} />
    </>
  );
}
