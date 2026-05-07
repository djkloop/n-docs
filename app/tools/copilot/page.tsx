import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CopilotPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/tools" className="text-muted-foreground hover:text-primary">
            ← 返回工具列表
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">GitHub Copilot</h1>
          <p className="text-muted-foreground">微软 AI 编程助手</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>VS Code 配置</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <code>{`{
  "github.copilot.advanced": {
    "apiBaseUrl": "https://api.new-api.com/v1",
    "apiKey": "your-new-api-key"
  }
}`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Copilot CLI</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono">
                export GITHUB_COPILOT_API_KEY=&quot;your-new-api-key&quot;
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
