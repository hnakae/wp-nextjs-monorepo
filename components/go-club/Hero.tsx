import { Button } from "@/components/ui/button";
import { getSdkWithFetch } from "@/lib/graphql-client";
import Link from "next/link";

export async function Hero() {
  const sdk = getSdkWithFetch({ next: { revalidate: 60 } });
  const { pageBy } = await sdk.GetPageBySlug({ slug: "hero" });

  return (
    <section id="home" className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl tracking-tight">
              {pageBy?.title ?? "Welcome to Eugene Go Club"}
            </h1>
            <div
              className="text-lg md:text-xl text-muted-foreground max-w-3xl"
              dangerouslySetInnerHTML={{
                __html:
                  pageBy?.content ??
                  "Join Oregon's premier go community in Eugene. Learn the ancient game of strategy, improve your skills, and connect with fellow players in a welcoming environment.",
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="https://www.meetup.com/eugene-go-players/?eventOrigin=event_home_page"
              rel="noopener noreferrer"
              title="https://www.meetup.com/eugene-go-players/"
            >
              <Button size="lg" className="text-base hover:cursor-pointer">
                Join Our Next Meeting
              </Button>
            </Link>

            <Link
              href="https://www.usgo.org/content.aspx?page_id=22&club_id=454497&module_id=550339"
              rel="noopener noreferrer"
              title="aga/learn to play go"
            >
              {" "}
              <Button variant="outline" size="lg" className="text-base">
                Learn About Go
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl">
            <div className="text-center space-y-2">
              <div className="text-2xl">🏆</div>
              <h3>All Skill Levels</h3>
              <p className="text-sm text-muted-foreground">
                From complete beginners to dan-level players
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl">📅</div>
              <h3>Regular Meetings</h3>
              <p className="text-sm text-muted-foreground">
                Weekly sessions every Wednesday evening
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl">🤝</div>
              <h3>Friendly Community</h3>
              <p className="text-sm text-muted-foreground">
                Welcoming atmosphere for learning and growth
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
