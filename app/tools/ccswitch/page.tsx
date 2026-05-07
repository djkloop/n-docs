import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CCSwitchPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/tools" className="text-muted-foreground hover:text-primary">
            ← 返回工具列表
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">CCSwitch</h1>
          <p className="text-muted-foreground">Claude Code 代理切换工具</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>简介</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                CCSwitch 用于在多个 Claude Code 配置之间快速切换，支持切换不同的 API 端点。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>安装</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono">
                npm install -g ccswitch
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>配置</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <code>{`{
  "profiles": {
    "newapi": {
      "name": "New API 中转",
      "api_key": "your-new-api-key",
      "base_url": "https://api.new-api.com/v1"
    }
  }
}`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>使用</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono">
                ccswitch use newapi
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
