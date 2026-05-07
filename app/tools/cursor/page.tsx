import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CursorPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/tools" className="text-muted-foreground hover:text-primary">
            ← 返回工具列表
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Cursor</h1>
          <p className="text-muted-foreground">AI 代码编辑器</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>配置 New API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>打开 Cursor 设置 (Cmd/Ctrl + ,)</li>
                <li>切换到 &quot;Models&quot; 标签</li>
                <li>在 &quot;API Key&quot; 中输入 New API 密钥</li>
                <li>在 &quot;API Endpoint&quot; 中输入 New API 地址</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>配置文件</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <code>{`{
  "cursor.apiKey": "your-new-api-key",
  "cursor.apiUrl": "https://api.new-api.com/v1"
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
