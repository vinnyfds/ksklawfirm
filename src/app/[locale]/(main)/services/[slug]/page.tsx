import { notFound } from 'next/navigation';
import { Link } from '@/lib/navigation';
import { Card, CardContent } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { prisma } from '@/lib/db';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function getService(slug: string) {
  try {
    // Services are static pages, not stored in Content table
    // This is a placeholder - you may want to remove this route
    // or implement a different service lookup mechanism
    const service = await prisma.content.findFirst({
      where: {
        slug,
        isPublished: true,
      },
    });

    if (!service) {
      return null;
    }

    return {
      id: service.id,
      slug: service.slug,
      title: service.title,
      content: service.content,
    };
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.title, href: `/services/${service.slug}` },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4">
          {service.title}
        </h1>
        <Card className="mb-8">
          <CardContent className="p-8">
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



