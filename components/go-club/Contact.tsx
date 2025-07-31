import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Want to join? We&apos;d love to hear from you!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach out to us directly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-sm text-muted-foreground">
                  contact@eugenego.club
                </p>
              </div>
              <div>
                <h4 className="font-medium">Club President</h4>
                <p className="text-sm text-muted-foreground">
                  Daniel Pono Takamori
                </p>
                <p className="text-sm text-muted-foreground">
                  971-533-7727
                </p>
                <p className="text-sm text-muted-foreground">
                  Contact us for more information about leadership and club activities
                </p>
                
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Join Our Community</CardTitle>
              <CardDescription>Connect with us online</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Online Groups</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Join our online communities for announcements and discussion
                </p>
                <div className="">
                  <a href="https://www.facebook.com/groups/116957312312340/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full justify-start mb-2">
                      Facebook Group
                    </Button>
                  </a>
                  <a href="https://discord.com/channels/1164649557687275703/1164649557687275706" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Discord Server
                    </Button>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-medium">First Time Visiting?</h4>
                <p className="text-sm text-muted-foreground">
                  Just show up to any Thursday meeting! No need to register or bring anything. 
                  We&apos;ll provide everything you need to get started.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}