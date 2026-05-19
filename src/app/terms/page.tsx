import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold mb-8">
            Terms of Service
          </h1>
          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-foreground font-[family-name:var(--font-space-grotesk)] text-xl font-semibold mt-8">1. Acceptance of Terms</h2>
            <p>By using AIStudio, you agree to these Terms of Service. If you do not agree, please do not use the platform.</p>

            <h2 className="text-foreground font-[family-name:var(--font-space-grotesk)] text-xl font-semibold mt-8">2. Service Description</h2>
            <p>AIStudio provides AI-powered product photography generation services. Users can upload product images and generate professional studio-quality photographs using various AI models and presets.</p>

            <h2 className="text-foreground font-[family-name:var(--font-space-grotesk)] text-xl font-semibold mt-8">3. Usage Limits</h2>
            <p>Free users are limited to 3 successful generations per day. Failed or refunded generations do not count toward the daily limit. Limits reset at midnight UTC.</p>

            <h2 className="text-foreground font-[family-name:var(--font-space-grotesk)] text-xl font-semibold mt-8">4. Content Ownership</h2>
            <p>You retain ownership of all images you upload and all images generated through our service. You are free to use generated images for commercial purposes.</p>

            <h2 className="text-foreground font-[family-name:var(--font-space-grotesk)] text-xl font-semibold mt-8">5. Prohibited Use</h2>
            <p>You may not use AIStudio to generate illegal, harmful, or offensive content. We reserve the right to suspend accounts that violate these terms.</p>

            <h2 className="text-foreground font-[family-name:var(--font-space-grotesk)] text-xl font-semibold mt-8">6. Contact</h2>
            <p>For questions about these terms, please contact us at legal@aistudio.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
