import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">快速入门</h1>
          <p className="text-muted-foreground">配置 New API 中转服务</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. 注册 New API</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">访问 new-api.com 完成注册</p>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono">
                https://new-api.com
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. 获取 API 密钥</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">在控制台获取 API 密钥</p>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono">
                sk-new-api-xxxxxxxxxxxxxxxxxxxx
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. 配置环境变量</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <code>{`# OpenAI 系列工具
export OPENAI_API_KEY="your-new-api-key"
export OPENAI_API_BASE="https://api.new-api.com/v1"

# Claude 系列工具
export ANTHROPIC_API_KEY="your-new-api-key"
export ANTHROPIC_BASE_URL="https://api.new-api.com/v1"`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
