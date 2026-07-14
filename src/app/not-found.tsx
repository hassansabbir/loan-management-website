import Link from "next/link";
import Container from "@/components/ui/Container";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <Container>
        <Typography variant="h1" className="text-9xl mb-4 opacity-20">
          404
        </Typography>
        <Typography variant="h2" className="mb-4">
          Page Not Found
        </Typography>
        <Typography variant="p" className="max-w-md mx-auto mb-8">
          The page you are looking for doesn&apos;t exist or has been moved. 
          Please check the URL or head back home.
        </Typography>
        <Link href="/">
          <Button className="gap-2">
            <MoveLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </Container>
    </div>
  );
}
