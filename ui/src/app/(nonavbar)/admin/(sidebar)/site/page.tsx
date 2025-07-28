import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Site() {
  return (
    <div className="space-y-6">
      {/* <CakeSection /> */}
      <Card>
        <CardHeader>
          <CardTitle>Under Development</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Check back in later</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
