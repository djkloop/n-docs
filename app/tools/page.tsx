import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tools = [
  {
    name: "Claude CLI",
    description: "Anthropic 官方 CLI",
    href: "/tools/claude",
    color: "bg-orange-500",
  },
  {
    name: "CCSwitch",
    description: "Claude Code 代理切换",
    href: "/tools/ccswitch",
    color: "bg-blue-500",
  },
  {
    name: "Codex",
    description: "OpenAI 代码生成",
    href: "/tools/codex",
    color: "bg-green-500",
  },
  {
    name: "Cursor",
    description: "AI 代码编辑器",
    href: "/tools/cursor",
    color: "bg-purple-500",
  },
  {
    name: "Copilot",
    description: "GitHub AI 助手",
    href: "/tools/copilot",
    color: "bg-blue-600",
  },
  {
    name: "Windsurf",
    description: "Codeium 编辑器",
    href: "/tools/windsurf",
    color: "bg-cyan-500",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">CLI 工具列表</h1>
          <p className="text-muted-foreground">选择要配置的 CLI 工具</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tools.map((tool) => (
            <Link key={tool.name} href={tool.href} className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg ${tool.color} flex items-center justify-center text-white font-bold`}>
                      {tool.name[0]}
                    </div>
                    <CardTitle>{tool.name}</CardTitle>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">查看配置 →</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>通用配置</CardTitle>
              <CardDescription>适用于所有 CLI 工具的环境变量设置</CardDescription>
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
