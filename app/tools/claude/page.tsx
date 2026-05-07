import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClaudePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/tools" className="text-muted-foreground hover:text-primary">
            ← 返回工具列表
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Claude CLI</h1>
          <p className="text-muted-foreground">Anthropic 官方 CLI 工具</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>安装</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono">
                npm install -g @anthropic-ai/claude-code
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>配置 New API</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <code>{`# 环境变量
export ANTHROPIC_API_KEY="your-new-api-key"
export ANTHROPIC_BASE_URL="https://api.new-api.com/v1"`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>验证配置</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono">
                claude --version
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
