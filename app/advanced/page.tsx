import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdvancedPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">高级配置</h1>
          <p className="text-muted-foreground">代理和自定义设置</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>自定义域名</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">配置你自己的域名作为 API 中转地址</p>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono">
                api.yourdomain.com CNAME your-new-api-domain.com
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>模型路由</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">配置不同模型的路由规则</p>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <code>{`routes:
  - path: /v1/chat/completions
    target: openai
    model_map:
      gpt-4: gpt-4-turbo
      gpt-3.5: gpt-3.5-turbo
  - path: /v1/messages
    target: anthropic
    model_map:
      claude: claude-3-5-sonnet`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Docker 部署</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">使用 Docker 部署 New API</p>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <code>{`version: "3.8"
services:
  new-api:
    image: new-api/new-api:latest
    ports:
      - "8080:8080"
    environment:
      - API_KEY=your-api-key
      - BASE_URL=https://api.new-api.com
    restart: unless-stopped`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
