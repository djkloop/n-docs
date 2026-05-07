import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CodexPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/tools" className="text-muted-foreground hover:text-primary">
            ← 返回工具列表
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Codex</h1>
          <p className="text-muted-foreground">OpenAI 代码生成模型</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>安装 OpenAI SDK</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono">
                pip install openai
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>配置 New API</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <code>{`from openai import OpenAI

client = OpenAI(
    api_key="your-new-api-key",
    base_url="https://api.new-api.com/v1"
)

response = client.completions.create(
    model="codex-davinci-002",
    prompt="# 写一个快速排序函数"
)`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
