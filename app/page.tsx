"use client";

import { useState } from "react";
import {
  Apple,
  Check,
  Clipboard,
  Code2,
  Copy,
  Download,
  KeyRound,
  Map,
  Menu,
  Monitor,
  PlugZap,
  Server,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const BASE_URL = "https://cybertruckai.top";
const BASE_URL_V1 = "https://cybertruckai.top/v1";
const TOKEN_URL = "https://cybertruckai.top/console/token";
const DIRECT_DOMAIN = "cybertruckai.top";

const navGroups = [
  {
    title: "开始使用",
    items: [{ id: "direct-connect-tips", label: "API 直连" }],
  },
  {
    title: "核心教程",
    items: [
      { id: "cc-switch-setup", label: "CC switch（推荐）" },
      { id: "claude-code-setup", label: "Claude Code" },
      { id: "codex-setup", label: "Codex Cli/App" },
      { id: "gemini-setup", label: "Gemini Cli" },
    ],
  },
  {
    title: "更多客户端",
    items: [
      { id: "cursor-other-setup", label: "Cursor" },
      { id: "vscode-codex-setup", label: "Codex 插件" },
      { id: "cline-setup", label: "Cline" },
      { id: "continue-setup", label: "Continue" },
      { id: "zed-setup", label: "Zed" },
      { id: "trae-cn-setup", label: "TRAE CN" },
      { id: "claude-codex-setup", label: "Codex2Claude" },
      { id: "opencode-setup", label: "OpenCode" },
      { id: "openclaw-setup", label: "OpenClaw" },
      { id: "droid-cli-setup", label: "Droid CLI" },
      { id: "cherry-studio-setup", label: "Cherry Studio" },
      { id: "chatbox-setup", label: "ChatBox" },
      { id: "typingmind-setup", label: "TypingMind" },
      { id: "boltai-setup", label: "BoltAI" },
      { id: "open-webui-setup", label: "Open WebUI" },
      { id: "librechat-setup", label: "LibreChat" },
      { id: "lobechat-setup", label: "LobeChat" },
      { id: "nextchat-setup", label: "NextChat" },
      { id: "anythingllm-setup", label: "AnythingLLM" },
    ],
  },
];

const clientCards = [
  {
    id: "cursor-other-setup",
    title: "Cursor 配置教程",
    icon: KeyRound,
    body: "进入 Cursor Settings -> Models，启用 OpenAI API Key，并打开 Override OpenAI Base URL。Claude 模型可用 Cursor 内置列表，GPT/Codex 系列需要手动 Add model。",
    steps: ["打开 Models 设置", "粘贴 Token", "添加模型名"] as [string, string, string],
    codeTitle: "Cursor 配置值",
    code: `OpenAI API Key: 粘贴 CyberTruck AI Token
Override OpenAI Base URL: ${BASE_URL_V1}
Add model: gpt-5.5 或 gpt-5.5-xhigh`,
  },
  {
    id: "vscode-codex-setup",
    title: "VSCode Codex 插件安装教程",
    icon: Terminal,
    body: "在 VS Code 扩展中搜索 Codex 并安装。侧栏出现 Codex 入口后，按 Codex CLI 配置全局 .codex，再选择 Use API Key。",
    steps: ["安装插件", "配置 .codex", "选择 Use API Key"] as [string, string, string],
    codeTitle: "配置文件位置",
    code: `%USERPROFILE%\\.codex\\config.toml
~/.codex/config.toml`,
  },
  {
    id: "cline-setup",
    title: "Cline 接入教程",
    icon: PlugZap,
    body: "Cline 支持 OpenAI Compatible provider。设置里选择 OpenAI Compatible，填写 Base URL、API Key 和 Model ID；CLI 用户也可以用 cline auth 指定 baseurl。",
    steps: ["选择 OpenAI Compatible", "填写 Base URL", "验证连接"] as [string, string, string],
    codeTitle: "Cline CLI",
    code: `cline auth -p openai \\
  -k 你的CyberTruckAIToken \\
  -b ${BASE_URL_V1} \\
  -m gpt-5.5`,
  },
  {
    id: "continue-setup",
    title: "Continue 接入教程",
    icon: Code2,
    body: "Continue 当前推荐使用 config.yaml。OpenAI 兼容服务使用 provider: openai，并把 apiBase 指向 CyberTruck AI 的 /v1 地址。",
    steps: ["打开 config.yaml", "添加 openai 模型", "重载 Continue"] as [string, string, string],
    codeTitle: "config.yaml",
    code: `name: CyberTruck AI
version: 0.0.1
schema: v1

models:
  - name: CyberTruck AI GPT-5.5
    provider: openai
    Model: gpt-5.5
    apiBase: ${BASE_URL_V1}
    apiKey: 你的CyberTruckAIToken`,
  },
  {
    id: "trae-cn-setup",
    title: "TRAE CN 接入教程",
    icon: PlugZap,
    body: "在支持自定义 API 的 TRAE / TRAE CN 版本中，进入模型配置，选择 OpenAI Compatible 或 Custom Provider，填写 Token、Base URL 和模型名。",
    steps: ["进入模型配置", "新增自定义模型", "填写 API 信息"] as [string, string, string],
    codeTitle: "TRAE 自定义模型",
    code: `Provider: OpenAI Compatible
API Key: 你的CyberTruckAIToken
Base URL: ${BASE_URL_V1}
Model ID: gpt-5.5`,
  },
  {
    id: "claude-codex-setup",
    title: "Codex2Claude",
    icon: Terminal,
    body: "继续使用 Claude Code 客户端，但后端实际走 Codex / GPT-5.5 模型。请使用 Codex 专用密钥，Base URL 填根地址。",
    steps: ["创建 Codex Key", "改 Claude 配置", "重启 Claude Code"] as [string, string, string],
    codeTitle: "settings.json",
    code: `{
  "env": {
    "ANTHROPIC_API_KEY": "替换为你创建的 Codex key",
    "ANTHROPIC_BASE_URL": "${BASE_URL}",
    "ANTHROPIC_MODEL": "gpt-5.5-xhigh",
    "ANTHROPIC_REASONING_MODEL": "gpt-5.5-xhigh"
  },
  "model": "gpt-5.5-xhigh"
}`,
  },
  {
    id: "opencode-setup",
    title: "OpenCode 配置教程",
    icon: Code2,
    body: "OpenCode 支持通过 /connect 添加 Other provider，并在 opencode.json 里配置 @ai-sdk/openai-compatible。baseURL 使用 /v1 地址。",
    steps: ["运行 /connect", "配置 opencode.json", "选择模型"] as [string, string, string],
    codeTitle: "opencode.json",
    code: `{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "cybertruckai": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "CyberTruck AI",
      "options": {
        "baseURL": "${BASE_URL_V1}"
      },
      "models": {
        "gpt-5.5": {
          "name": "CyberTruck AI GPT-5.5"
        }
      }
    }
  },
  "model": "cybertruckai/gpt-5.5"
}`,
  },
  {
    id: "openclaw-setup",
    title: "OpenClaw 配置教程",
    icon: Code2,
    body: "OpenClaw 可通过 OpenAI Responses 兼容方式接入，也可使用 Anthropic Messages 配置 Claude 协议。",
    steps: ["打开 Config", "修改 Raw JSON", "选择 Primary 模型"] as [string, string, string],
    codeTitle: "clawdbot.json",
    code: `{
  "providers": {
    "cybertruckai": {
      "baseUrl": "${BASE_URL_V1}",
      "apiKey": "你的API Key",
      "models": [{ "id": "gpt-5.5", "name": "CyberTruck AI GPT-5.5" }]
    }
  },
  "primary": "cybertruckai/gpt-5.5"
}`,
  },
];

const simpleClients = [
  { id: "droid-cli-setup", label: "Droid CLI" },
  { id: "cherry-studio-setup", label: "Cherry Studio" },
  { id: "chatbox-setup", label: "ChatBox" },
  { id: "typingmind-setup", label: "TypingMind" },
  { id: "boltai-setup", label: "BoltAI" },
  { id: "open-webui-setup", label: "Open WebUI" },
  { id: "librechat-setup", label: "LibreChat" },
  { id: "lobechat-setup", label: "LobeChat" },
  { id: "nextchat-setup", label: "NextChat" },
  { id: "anythingllm-setup", label: "AnythingLLM" },
];

const simpleClientDetails: Record<
  string,
  {
    headline: string;
    description: string;
    steps: [string, string, string];
    codeTitle: string;
    code: string;
  }
> = {
  "droid-cli-setup": {
    headline: "Droid CLI 接入教程",
    description: "适合在终端或自动化脚本中使用 OpenAI Compatible API。",
    steps: ["选择自定义 Provider", "填入 Token 与 /v1 地址", "保存后在终端调用"],
    codeTitle: "环境变量示例",
    code: `export OPENAI_API_KEY="你的CyberTruckAIToken"
export OPENAI_BASE_URL="${BASE_URL_V1}"
droid --model gpt-5.5`,
  },
  "cherry-studio-setup": {
    headline: "Cherry Studio 接入教程",
    description: "在客户端模型服务里新增 OpenAI 兼容供应商，即可使用 CyberTruck AI 模型。",
    steps: ["新增服务商", "填写 API Key", "选择模型开始对话"],
    codeTitle: "服务商配置",
    code: `Provider Type: OpenAI Compatible
Name: CyberTruck AI
API Key: 你的CyberTruckAIToken
API Host: ${BASE_URL_V1}
Model: gpt-5.5`,
  },
  "chatbox-setup": {
    headline: "ChatBox 接入教程",
    description: "ChatBox 使用自定义 OpenAI API 配置，适合桌面端快速聊天。",
    steps: ["进入模型设置", "填写 /v1 地址", "保存并测试连接"],
    codeTitle: "ChatBox 自定义 API",
    code: `API Mode: Custom / OpenAI API
API Key: 你的CyberTruckAIToken
API Host: ${BASE_URL_V1}
Model: gpt-5.5`,
  },
  "typingmind-setup": {
    headline: "TypingMind 接入教程",
    description: "通过自定义模型提供商接入，适合网页端统一管理多个模型。",
    steps: ["添加 Custom Model", "配置 API Endpoint", "选择模型使用"],
    codeTitle: "TypingMind Custom Model",
    code: `Model ID: gpt-5.5
Endpoint: ${BASE_URL_V1}/chat/completions
API Key: 你的CyberTruckAIToken`,
  },
  "boltai-setup": {
    headline: "BoltAI 接入教程",
    description: "BoltAI 支持 OpenAI Compatible Endpoint，可直接填入 CyberTruck AI 地址。",
    steps: ["打开 AI Service", "新增 OpenAI Compatible", "填入 Token"],
    codeTitle: "BoltAI Service",
    code: `Service: OpenAI Compatible
Base URL: ${BASE_URL_V1}
API Key: 你的CyberTruckAIToken
Model: gpt-5.5`,
  },
  "open-webui-setup": {
    headline: "Open WebUI 接入教程",
    description: "适合自托管聊天前端，把 OpenAI API Base URL 指向 CyberTruck AI 即可。",
    steps: ["进入 Admin 设置", "配置 Connections", "保存并刷新模型"],
    codeTitle: "Open WebUI 环境变量",
    code: `OPENAI_API_KEY=你的CyberTruckAIToken
OPENAI_API_BASE_URL=${BASE_URL_V1}`,
  },
  "librechat-setup": {
    headline: "LibreChat 接入教程",
    description: "通过环境变量或配置文件添加 OpenAI 兼容端点，适合团队部署。",
    steps: ["编辑配置文件", "设置 Base URL", "重启服务"],
    codeTitle: "librechat.yaml 示例",
    code: `endpoints:
  custom:
    - name: "CyberTruck AI"
      apiKey: "\${CYBERTRUCKAI_API_KEY}"
      baseURL: "${BASE_URL_V1}"
      models:
        default: ["gpt-5.5"]`,
  },
  "lobechat-setup": {
    headline: "LobeChat 接入教程",
    description: "在模型供应商里添加自定义 OpenAI 服务，即可接入 CyberTruck AI。",
    steps: ["打开供应商设置", "填写 API Key", "选择模型"],
    codeTitle: "LobeChat OpenAI 兼容",
    code: `Provider: OpenAI Compatible
API Key: 你的CyberTruckAIToken
Base URL: ${BASE_URL_V1}
Model: gpt-5.5`,
  },
  "nextchat-setup": {
    headline: "NextChat 接入教程",
    description: "NextChat 可通过环境变量配置 OpenAI 接口地址，适合轻量部署。",
    steps: ["设置环境变量", "填入 /v1 地址", "重新部署"],
    codeTitle: "NextChat 环境变量",
    code: `OPENAI_API_KEY=你的CyberTruckAIToken
BASE_URL=${BASE_URL_V1}
CUSTOM_MODELS=gpt-5.5`,
  },
  "anythingllm-setup": {
    headline: "AnythingLLM 接入教程",
    description: "适合知识库问答场景，选择 OpenAI Compatible LLM Provider 后填入配置。",
    steps: ["选择 LLM Provider", "配置 Endpoint", "连接工作区"],
    codeTitle: "AnythingLLM LLM Provider",
    code: `LLM Provider: OpenAI Compatible
Base URL: ${BASE_URL_V1}
API Key: 你的CyberTruckAIToken
Model: gpt-5.5`,
  },
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-7 items-center gap-1.5 rounded-full border border-white/10 bg-white/8 px-3 text-xs text-slate-300 transition hover:bg-white/12 hover:text-white"
    >
      {copied ? <Check className="size-3.5 text-sky-300" /> : <Copy className="size-3.5" />}
      {copied ? "已复制" : "复制"}
    </button>
  );
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-none border border-slate-800 bg-slate-900">
      <div className="flex min-h-11 items-center justify-between gap-3 border-b border-slate-800 bg-slate-950 px-4">
        <span className="text-sm font-semibold text-slate-200">{title}</span>
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto bg-slate-800 p-4 text-[15px] font-bold leading-7 text-sky-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function FieldCard({
  label,
  value,
  copyable = false,
  action,
}: {
  label: string;
  value: string;
  copyable?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-black text-slate-500">{label}</p>
      <div className="mt-3 flex min-h-12 items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4">
        <code className="min-w-0 break-all font-mono text-[16px] text-neutral-950">{value}</code>
        <div className="flex shrink-0 items-center gap-3">
          {action}
          {copyable ? (
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(value)}
              className="text-sm font-black text-sky-600 hover:text-sky-700"
            >
              复制
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function GuideHero({
  icon: Icon,
  title,
  description,
  steps,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  steps: [string, string, string];
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-white px-5 py-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-sky-100 text-sky-600">
              <Icon className="size-6" />
            </span>
            <h1 className="text-[26px] font-black tracking-tight text-neutral-950">{title}</h1>
          </div>
          <p className="mt-4 text-[16px] leading-8 text-slate-600">{description}</p>
        </div>
        <div className="flex flex-col gap-4 lg:items-end">
          {action}
          <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[390px]">
            {steps.map((step, index) => (
              <div key={step} className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="grid size-7 place-items-center rounded-full bg-neutral-950 text-xs font-black text-white">
                  {index + 1}
                </span>
                <p className="mt-3 text-sm font-black text-neutral-950">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-5 flex max-h-[calc(100vh-40px)] flex-col gap-4 overflow-y-auto pr-2">
        {navGroups.map((group) => (
          <nav key={group.title} className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="mb-4 text-base font-black text-slate-950">{group.title}</p>
            <div className="space-y-1.5">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    "block w-full rounded-md px-3 py-3 text-left text-[15px] font-bold transition",
                    activeId === item.id
                      ? "bg-neutral-950 text-white"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        ))}
      </div>
    </aside>
  );
}

function MobileNav({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="sticky top-0 z-40 border-b border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur lg:hidden">
      <div className="flex gap-2 overflow-x-auto">
        {navGroups.flatMap((group) =>
          group.items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-2 text-sm font-bold",
                activeId === item.id
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-slate-200 bg-white text-slate-600"
              )}
            >
              {item.label}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function InfoBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-sky-100 bg-sky-50/80 p-5 text-slate-900 shadow-[inset_0_0_0_1px_rgba(14,165,233,0.05)]">
      <p className="text-base font-black">{title}</p>
      <div className="mt-3 text-[15px] leading-8 text-slate-800">{children}</div>
    </div>
  );
}

function DirectConnectSection() {
  return (
    <section>
      <GuideHero
        icon={Map}
        title="API 直连建议"
        description="如果你使用 Clash、代理分流或公司网络网关，建议先把 CyberTruck AI 域名加入直连，减少超时、绕路和 TLS 连接异常。"
        steps={["添加直连规则", "保存并刷新订阅", "检查连接命中"]}
      />
      <p className="mt-7 text-[17px] leading-9 text-slate-500">
        本站 API <strong className="font-black text-neutral-950">直连最佳</strong>。如果你在 Clash Verge Rev v1.7.x
        及以上版本里把 <code className="rounded bg-slate-100 px-1.5 py-1 font-mono text-neutral-950">prepend-rules</code>{" "}
        写进 Merge Template/扩展配置，很可能根本没有应用到最终规则，导致依旧走代理。
      </p>

      <div className="mt-6 space-y-5">
        <InfoBox title="原因说明">
          Clash Verge Rev v1.7.x 起，“Merge 配置”改名为“扩展配置”，扩展配置只做配置项覆写/合并；往规则数组里
          prepend/append 已迁移到订阅右键菜单的“编辑规则”。直接写{" "}
          <code className="rounded bg-white px-1.5 py-1 font-mono">rules:</code> 会整段覆盖规则，容易造成规则丢失或异常。
        </InfoBox>

        <InfoBox title="方案 A（推荐）：编辑规则添加前置规则">
          <ol className="list-decimal space-y-3 pl-6 text-slate-500">
            <li>在 Profiles/订阅 列表右键当前订阅 {"->"} 选择“编辑规则”。</li>
            <li>选择“前置规则 / prepend”。</li>
            <li>添加下面这条规则并保存，模式保持 Rule。</li>
          </ol>
          <div className="mt-5">
            <CodeBlock title="前置规则" code={`DOMAIN-SUFFIX,${DIRECT_DOMAIN},DIRECT`} />
          </div>
          <p className="mt-4">
            提示：
            <code className="rounded bg-white px-1.5 py-1 font-mono">DOMAIN-SUFFIX,{DIRECT_DOMAIN}</code> 已包含{" "}
            <code className="rounded bg-white px-1.5 py-1 font-mono">{DIRECT_DOMAIN}</code>。
          </p>
        </InfoBox>

        <InfoBox title="方案 B：扩展脚本强行插入规则">
          <p>如果坚持用文本配置，可在订阅扩展脚本或全局扩展脚本中写入：</p>
          <div className="mt-5">
            <CodeBlock
              title="扩展脚本"
              code={`function main(config, profileName) {
  const rule = 'DOMAIN-SUFFIX,cybertruckai.top,DIRECT'
  const rules = Array.isArray(config.rules) ? config.rules : []
  if (!rules.includes(rule)) {
    config.rules = [rule, ...rules]
  }
  return config
}`}
            />
          </div>
        </InfoBox>

        <InfoBox title="如何确认“真的直连”">
          <ul className="list-disc space-y-3 pl-6 text-slate-500">
            <li>
              打开 Connections/连接，访问{" "}
              <a href={BASE_URL} className="font-black text-slate-700 underline underline-offset-4">
                {BASE_URL}
              </a>
              。
            </li>
            <li>
              在连接详情查看 Rule 是否命中{" "}
              <code className="rounded bg-white px-1.5 py-1 font-mono">DOMAIN-SUFFIX,{DIRECT_DOMAIN}</code>，Chain 是否为 DIRECT。
            </li>
            <li>
              若仍走代理，说明真实 Host 不是 {DIRECT_DOMAIN}；按 Connections 里显示的 Host 再补一条{" "}
              <code className="rounded bg-white px-1.5 py-1 font-mono">DOMAIN-SUFFIX,实际域名,DIRECT</code>。
            </li>
          </ul>
        </InfoBox>
      </div>
      <p className="mt-6 text-[16px] leading-8 text-slate-500">
        其他代理软件：在“规则 / 分流 / 绕过代理（No Proxy）”里把{" "}
        <code className="rounded bg-slate-100 px-1.5 py-1 font-mono text-neutral-950">{DIRECT_DOMAIN}</code> 加入直连即可。
      </p>
    </section>
  );
}

function CCSwitchGuide() {
  return (
    <section>
      <div>
        <GuideHero
          icon={Menu}
          title="CC Switch 配置 Claude、Codex、Gemini"
          description="适合不想手动改配置文件的同学。安装后切换到目标配置对象，按表单填入供应商名称、Token 和请求地址即可。"
          steps={["安装 CC Switch", "选择目标配置", "填入参数保存"]}
          action={
            <a
              href="https://github.com"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-black text-white hover:bg-neutral-800"
            >
              <Download className="size-4" />
              下载 CC Switch
            </a>
          }
        />

        <p className="mt-7 text-[17px] font-medium leading-8 text-sky-600">
          适合不想手动改配置文件的同学，按步骤填入即可。
        </p>
        <ol className="mt-5 list-decimal space-y-3 pl-6 text-[16px] leading-7 text-slate-500">
          <li>安装后，在应用顶部 Tab 切换到你的目标配置对象（Claude、Codex、Gemini），然后添加自定义配置。</li>
          <li>按下方参数填入并保存。</li>
        </ol>

        <div className="mt-6 space-y-4">
          <FieldCard label="供应商名称（随意输入皆可）" value="CyberTruck AI" copyable />
          <FieldCard
            label="API Key"
            value="sk-********（粘贴你的 key）"
            action={
              <a
                href={TOKEN_URL}
                target="_blank"
                rel="noreferrer"
                className="whitespace-nowrap text-sm font-black text-sky-600 hover:text-sky-700"
              >
                打开 Token 地址
              </a>
            }
          />
          <FieldCard label="API 请求地址" value={BASE_URL} copyable />

        </div>
      </div>
    </section>
  );
}

type PlatformId = "windows" | "macos" | "linux";

const platformTabs: Array<{
  id: PlatformId;
  label: string;
  icon: typeof Monitor;
}> = [
  { id: "windows", label: "Windows", icon: Monitor },
  { id: "macos", label: "macOS", icon: Apple },
  { id: "linux", label: "Linux", icon: Terminal },
];

function StepCard({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-full bg-neutral-950 text-sm font-black text-white">{step}</span>
        <h3 className="text-xl font-black text-neutral-950">{title}</h3>
      </div>
      <div className="mt-5 space-y-4 text-[15px] leading-8 text-slate-500">{children}</div>
    </section>
  );
}

function ClaudeCodeGuide() {
  const [platform, setPlatform] = useState<PlatformId>("windows");
  const selected = platformTabs.find((item) => item.id === platform) ?? platformTabs[0];
  const PlatformIcon = selected.icon;
  const settingsPath =
    platform === "windows"
      ? "%USERPROFILE%\\.claude\\settings.json"
      : "~/.claude/settings.json";
  const shellName = platform === "windows" ? "CMD/PowerShell（管理员模式）" : "Terminal";

  return (
    <section>
      <GuideHero
        icon={Terminal}
        title="Claude Code 接入教程"
        description="按当前系统安装 Claude Code CLI，创建 CyberTruck AI 的 Claude Code 分组 Token，然后写入本地配置文件即可开始使用。"
        steps={["安装环境", "写入 Token", "进入项目"]}
      />

      <div className="mt-7 border-y border-slate-200 bg-slate-50 py-3">
        <div className="flex flex-wrap gap-2">
          {platformTabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPlatform(item.id)}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-black transition",
                platform === item.id
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-5 flex items-center gap-3">
          <PlatformIcon className="size-7 text-sky-500" />
          <h2 className="text-2xl font-black text-neutral-950">{selected.label} 版本教程</h2>
        </div>

        <div className="rounded-lg bg-slate-50 p-4 text-[14px] leading-7 text-slate-500">
          <p className="font-black text-neutral-950">系统要求</p>
          <ul className="mt-1 list-disc pl-5">
            <li>{platform === "windows" ? "Windows 10 或 Windows 11" : platform === "macos" ? "macOS 12 或更高版本" : "主流 Linux 发行版"}</li>
            <li>Node.js 18+</li>
          </ul>
        </div>

        <div className="mt-6 space-y-5">
          <StepCard step={1} title="安装 Node.js">
            {platform === "windows" ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="font-black text-slate-700">官方安装包（推荐）</p>
                <ol className="mt-3 list-decimal space-y-2 pl-5">
                  <li>
                    访问 <a className="font-bold text-sky-600 underline underline-offset-4" href="https://nodejs.org">https://nodejs.org</a>
                  </li>
                  <li>下载 LTS 版本的 Windows Installer (.msi)</li>
                  <li>运行安装程序，按默认设置完成安装</li>
                  <li>安装程序会自动添加到 PATH 环境变量</li>
                </ol>
              </div>
            ) : (
              <CodeBlock
                title={shellName}
                code={platform === "macos" ? "brew install node" : "sudo apt update\nsudo apt install -y nodejs npm"}
              />
            )}
            <p>验证安装：</p>
            <CodeBlock title={shellName} code={"node --version\nnpm --version"} />
          </StepCard>

          <StepCard step={2} title="安装 Claude Code CLI">
            <p className="text-sky-600">{platform === "windows" ? "打开命令提示符（以管理员身份运行）或 PowerShell，执行以下命令：" : "打开终端，执行以下命令："}</p>
            <CodeBlock title={shellName} code="npm install -g @anthropic-ai/claude-code" />
            <p>验证安装：</p>
            <CodeBlock title={shellName} code="claude --version" />
          </StepCard>

          <StepCard step={3} title="配置 CyberTruck AI">
            <p>3.1 获取 Auth Token</p>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  访问 CyberTruck AI 控制台并创建 Token：{" "}
                  <a className="font-bold text-sky-600 underline underline-offset-4" href={TOKEN_URL}>
                    {TOKEN_URL}
                  </a>
                </li>
                <li>点击「创建密钥」</li>
                <li>密钥名称：随意填写</li>
                <li>密钥分组请选择：Claude Code 相关分组</li>
                <li>额度建议：按你的使用方式配置</li>
                <li>其他选项保持默认</li>
              </ol>
            </div>
            <p>3.2 配置环境变量</p>
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-600">
              <p className="font-black">重要提示</p>
              <p className="mt-2">请将下方的 ANTHROPIC_AUTH_TOKEN 替换为您在 {TOKEN_URL} 生成的 Claude Code API 密钥！</p>
            </div>
            <div className="rounded-lg border border-sky-100 bg-sky-50/80 p-4">
              <p className="font-black text-sky-700">settings.json 位置</p>
              <p className="mt-2 text-sky-600">{selected.label} 配置位置：{settingsPath}</p>
            </div>
            <CodeBlock
              title="settings.json 配置（推荐，永久生效）"
              code={`{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "粘贴为Claude Code分组密钥key",
    "ANTHROPIC_BASE_URL": "${BASE_URL}"
  }
}`}
            />
            <div className="rounded-lg border border-sky-100 bg-sky-50/80 p-4">
              <p className="font-black text-slate-700">注意</p>
              <p className="mt-2">配置文件更加安全且便于管理，需要重启 Claude Code 才生效。</p>
            </div>
          </StepCard>

          <StepCard step={4} title="启动 Claude Code">
            <p className="text-sky-600">配置完成后，先进入到工程目录：</p>
            <CodeBlock title={shellName} code="cd your-project-folder" />
            <p>运行以下命令启动：</p>
            <CodeBlock title={shellName} code="claude" />
          </StepCard>
        </div>
      </div>
    </section>
  );
}

function CodexGuide() {
  const [platform, setPlatform] = useState<PlatformId>("windows");
  const selected = platformTabs.find((item) => item.id === platform) ?? platformTabs[0];
  const PlatformIcon = selected.icon;
  const codexDir = platform === "windows" ? "%USERPROFILE%\\.codex" : "~/.codex";
  const shellName = platform === "windows" ? "CMD/PowerShell（管理员模式）" : "Terminal";
  const makeDirCommand =
    platform === "windows"
      ? "mkdir %USERPROFILE%\\.codex\ncd %USERPROFILE%\\.codex"
      : "mkdir -p ~/.codex\ncd ~/.codex";

  return (
    <section>
      <GuideHero
        icon={Code2}
        title="Codex 快速开始"
        description="强大的 OpenAI 代码助手，支持工程级任务。请使用 Codex 专用分组 Token，并在 .codex 目录中写入 config.toml 与 auth.json。"
        steps={["环境准备", "安装配置", "开始编程"]}
      />

      <div className="mt-7 border-y border-slate-200 bg-slate-50 py-3">
        <div className="flex flex-wrap gap-2">
          {platformTabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPlatform(item.id)}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-black transition",
                platform === item.id
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-5 flex items-center gap-3">
          <PlatformIcon className="size-7 text-sky-500" />
          <h2 className="text-2xl font-black text-neutral-950">{selected.label} 版本教程</h2>
        </div>

        <div className="rounded-lg bg-slate-50 p-4 text-[14px] leading-7 text-slate-500">
          <p className="font-black text-neutral-950">系统要求</p>
          <ul className="mt-1 list-disc pl-5">
            <li>{platform === "windows" ? "Windows 10 或 Windows 11" : platform === "macos" ? "macOS 12 或更高版本" : "主流 Linux 发行版"}</li>
            <li>Node.js 18+</li>
          </ul>
        </div>

        <div className="mt-6 space-y-5">
          <StepCard step={1} title="安装 Node.js">
            {platform === "windows" ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="font-black text-slate-700">官方安装包（推荐）</p>
                <ol className="mt-3 list-decimal space-y-2 pl-5">
                  <li>
                    访问 <a className="font-bold text-sky-600 underline underline-offset-4" href="https://nodejs.org">https://nodejs.org</a>
                  </li>
                  <li>下载 LTS 版本的 Windows Installer (.msi)</li>
                  <li>运行安装程序，按默认设置完成安装</li>
                  <li>安装程序会自动添加到 PATH 环境变量</li>
                </ol>
              </div>
            ) : (
              <CodeBlock
                title={shellName}
                code={platform === "macos" ? "brew install node" : "sudo apt update\nsudo apt install -y nodejs npm"}
              />
            )}
            <p>验证安装：</p>
            <CodeBlock title={shellName} code={"node --version\nnpm --version"} />
          </StepCard>

          <StepCard step={2} title="全局安装 Codex CLI">
            <p className="text-sky-600">{platform === "windows" ? "打开命令提示符（以管理员身份运行）或 PowerShell，执行以下命令：" : "打开终端，执行以下命令："}</p>
            <CodeBlock title={shellName} code="npm install -g @openai/codex@latest" />
            <p>验证安装：</p>
            <CodeBlock title={shellName} code="codex --version" />
          </StepCard>

          <StepCard step={3} title="配置 CyberTruck AI">
            <p>3.1 获取 Codex 专用 API Token</p>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  访问 CyberTruck AI 控制台并创建 Token：{" "}
                  <a className="font-bold text-sky-600 underline underline-offset-4" href={TOKEN_URL}>
                    {TOKEN_URL}
                  </a>
                </li>
                <li>点击「创建密钥」</li>
                <li>密钥名称：随意填写</li>
                <li>密钥分组请选择：Codex 相关分组</li>
                <li>额度建议：按你的使用方式配置</li>
                <li>其他选项保持默认</li>
              </ol>
            </div>
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-600">
              <p className="font-black">重要提示</p>
              <p className="mt-2">Codex 需要使用专门的分组令牌，与 Claude Code 的令牌不同！</p>
            </div>

            <p>3.2 创建配置文件夹</p>
            <CodeBlock title={shellName} code={makeDirCommand} />
            <p>
              安装 Codex 插件和 Codex CLI 后，.codex 默认位于{" "}
              <code className="rounded bg-slate-100 px-1.5 py-1 font-mono text-neutral-950">{codexDir}</code>。
            </p>

            <p>3.3 创建配置文件</p>
            <p>3.3.1 创建 config.toml 文件：</p>
            <CodeBlock
              title="config.toml"
              code={`approval_policy = "never"
sandbox_mode = "danger-full-access"
model_provider = "cybertruckai"
model = "gpt-5.5"
model_reasoning_effort = "xhigh"
plan_mode_reasoning_effort = "xhigh"
model_reasoning_summary = "detailed"
network_access = "enabled"
disable_response_storage = true
windows_wsl_setup_acknowledged = true

[model_providers.cybertruckai]
name = "cybertruckai"
base_url = "${BASE_URL}"
wire_api = "responses"
requires_openai_auth = true`}
            />
            <p>3.3.2 创建 auth.json 文件：</p>
            <CodeBlock
              title="auth.json"
              code={`{
  "OPENAI_API_KEY": "粘贴为Codex专用分组密钥key"
}`}
            />
          </StepCard>

          <StepCard step={4} title="启动 Codex">
            <p className="text-sky-600">配置完成后，先进入到工程目录：</p>
            <CodeBlock title={shellName} code={"mkdir my-codex-project\ncd my-codex-project"} />
            <p>然后，运行以下命令启动：</p>
            <CodeBlock title={shellName} code="codex" />
          </StepCard>
        </div>
      </div>
    </section>
  );
}

function GeminiGuide() {
  const [platform, setPlatform] = useState<PlatformId>("windows");
  const selected = platformTabs.find((item) => item.id === platform) ?? platformTabs[0];
  const PlatformIcon = selected.icon;
  const geminiDir = platform === "windows" ? "%USERPROFILE%\\.gemini" : "~/.gemini";
  const shellName = platform === "windows" ? "CMD/PowerShell（管理员模式）" : "Terminal";
  const makeDirCommand =
    platform === "windows"
      ? "mkdir %USERPROFILE%\\.gemini\ncd %USERPROFILE%\\.gemini"
      : "mkdir -p ~/.gemini\ncd ~/.gemini";

  return (
    <section>
      <GuideHero
        icon={Server}
        title="Gemini CLI 快速开始"
        description="Google 命令行 AI 工具，配置 CyberTruck AI 的 Gemini CLI 分组 Token 后即可快速接入使用。"
        steps={["安装 CLI", "配置 API", "开始体验"]}
      />

      <div className="mt-7 border-y border-slate-200 bg-slate-50 py-3">
        <div className="flex flex-wrap gap-2">
          {platformTabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPlatform(item.id)}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-black transition",
                platform === item.id
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-5 flex items-center gap-3">
          <PlatformIcon className="size-7 text-sky-500" />
          <h2 className="text-2xl font-black text-neutral-950">{selected.label} 版本教程</h2>
        </div>

        <div className="rounded-lg bg-slate-50 p-4 text-[14px] leading-7 text-slate-500">
          <p className="font-black text-neutral-950">系统要求</p>
          <ul className="mt-1 list-disc pl-5">
            <li>{platform === "windows" ? "Windows 10 或 Windows 11" : platform === "macos" ? "macOS 12 或更高版本" : "主流 Linux 发行版"}</li>
            <li>Node.js 18+</li>
          </ul>
        </div>

        <div className="mt-6 space-y-5">
          <StepCard step={1} title="安装 Node.js">
            {platform === "windows" ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="font-black text-slate-700">官方安装包（推荐）</p>
                <ol className="mt-3 list-decimal space-y-2 pl-5">
                  <li>
                    访问 <a className="font-bold text-sky-600 underline underline-offset-4" href="https://nodejs.org">https://nodejs.org</a>
                  </li>
                  <li>下载 LTS 版本的 Windows Installer (.msi)</li>
                  <li>运行安装程序，按默认设置完成安装</li>
                  <li>安装程序会自动添加到 PATH 环境变量</li>
                </ol>
              </div>
            ) : (
              <CodeBlock
                title={shellName}
                code={platform === "macos" ? "brew install node" : "sudo apt update\nsudo apt install -y nodejs npm"}
              />
            )}
            <p>验证安装：</p>
            <CodeBlock title={shellName} code={"node --version\nnpm --version"} />
          </StepCard>

          <StepCard step={2} title="全局安装 Gemini CLI">
            <p className="text-sky-600">{platform === "windows" ? "打开命令提示符（以管理员身份运行）或 PowerShell，执行以下命令：" : "打开终端，执行以下命令："}</p>
            <CodeBlock title={shellName} code="npm install -g @google/gemini-cli" />
          </StepCard>

          <StepCard step={3} title="配置 Gemini CLI">
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-600">
              <p className="font-black">重要提示</p>
              <p className="mt-2">请将下方的 GEMINI_API_KEY 替换为您在 {TOKEN_URL} 生成的 Gemini CLI 专用 API 密钥！</p>
            </div>

            <p>3.1 创建 .gemini 文件夹</p>
            <div className="rounded-lg border border-sky-100 bg-sky-50/80 p-4">
              <p className="font-black text-sky-700">配置位置</p>
              <p className="mt-2 text-sky-600">配置位置：{geminiDir}</p>
            </div>
            <CodeBlock title={shellName} code={makeDirCommand} />

            <p>3.2 创建 .env 文件</p>
            <p>在 .gemini 文件夹中创建 .env 文件：</p>
            <CodeBlock
              title=".env"
              code={`GOOGLE_GEMINI_BASE_URL=${BASE_URL}
GEMINI_API_KEY=粘贴为Gemini CLI相关分组密钥key
GEMINI_MODEL=gemini-3-pro-preview`}
            />

            <p>3.3 创建 settings.json 文件</p>
            <p>在 .gemini 文件夹中创建 settings.json 文件：</p>
            <CodeBlock
              title="settings.json"
              code={`{
  "ide": {
    "enabled": true
  },
  "security": {
    "auth": {
      "selectedType": "gemini-api-key"
    }
  }
}`}
            />
            <div className="rounded-lg border border-sky-100 bg-sky-50/80 p-4">
              <p className="font-black text-slate-700">注意</p>
              <p className="mt-2">配置文件更加安全且便于管理，需要重启 Gemini CLI 才生效。</p>
            </div>
          </StepCard>

          <StepCard step={4} title="启动 Gemini CLI">
            <p className="text-sky-600">配置完成后，运行以下命令启动：</p>
            <CodeBlock title={shellName} code="gemini" />
          </StepCard>
        </div>
      </div>
    </section>
  );
}

function ZedGuide() {
  return (
    <section>
      <GuideHero
        icon={Code2}
        title="Zed 接入教程"
        description="Zed 官方支持通过 openai_compatible provider 添加自定义模型。你可以通过 UI 添加，也可以直接修改 settings.json。"
        steps={["打开设置", "添加 Provider", "保存模型"]}
      />

      <div className="mt-7 space-y-5">
        <p className="text-[17px] leading-9 text-sky-600">
          Zed 官方支持通过{" "}
          <code className="rounded bg-slate-100 px-1.5 py-1 font-mono text-neutral-950">openai_compatible</code>{" "}
          provider 添加自定义模型。你可以通过 UI 添加，也可以直接修改设置文件。
        </p>
        <ol className="list-decimal space-y-4 pl-6 text-[16px] leading-8 text-slate-500">
          <li>
            在 Zed 中执行{" "}
            <code className="rounded bg-slate-100 px-1.5 py-1 font-mono text-neutral-950">agent: open settings</code>。
          </li>
          <li>
            在{" "}
            <code className="rounded bg-slate-100 px-1.5 py-1 font-mono text-neutral-950">LLM Providers</code>{" "}
            区域点击{" "}
            <code className="rounded bg-slate-100 px-1.5 py-1 font-mono text-neutral-950">Add Provider</code>。
          </li>
          <li>
            或者直接编辑设置文件，新增{" "}
            <code className="rounded bg-slate-100 px-1.5 py-1 font-mono text-neutral-950">openai_compatible</code>{" "}
            provider。
          </li>
        </ol>

        <CodeBlock
          title="settings.json 示例"
          code={`{
  "language_models": {
    "openai_compatible": {
      "CyberTruck AI": {
        "api_url": "${BASE_URL_V1}",
        "api_key": "sk-替换为你的key",
        "available_models": [
          {
            "name": "gpt-5.5",
            "display_name": "CyberTruck AI GPT-5.5",
            "max_tokens": 128000,
            "max_completion_tokens": 16384
          }
        ]
      }
    }
  }
}`}
        />

        <div className="rounded-lg border border-sky-100 bg-sky-50/80 p-5 text-[16px] leading-8 text-slate-700">
          提示：如果你接入的是更偏 Responses API 的模型，可以继续补{" "}
          <code className="rounded bg-white px-1.5 py-1 font-mono text-neutral-950">capabilities</code>{" "}
          字段；首次配置建议先从上面的最小示例开始。
        </div>
      </div>
    </section>
  );
}

function ClientGuideCard({ guide }: { guide: (typeof clientCards)[number] }) {
  return (
    <section>
      <GuideHero
        icon={guide.icon}
        title={guide.title}
        description={guide.body}
        steps={guide.steps}
      />
      <div className="mt-5">
        <CodeBlock title={guide.codeTitle} code={guide.code} />
      </div>
    </section>
  );
}

function SimpleClientCard({ id, label }: { id: string; label: string }) {
  const detail = simpleClientDetails[id] ?? {
    headline: `${label} 接入教程`,
    description: "选择 OpenAI Compatible / Custom Provider，填入 CyberTruck AI Token 和 /v1 地址即可使用。",
    steps: ["打开设置", "填写 API 信息", "保存使用"] as [string, string, string],
    codeTitle: "OpenAI Compatible",
    code: `API Key: 你的CyberTruckAIToken
Base URL: ${BASE_URL_V1}
Model: gpt-5.5`,
  };

  return (
    <section>
      <GuideHero icon={Clipboard} title={detail.headline} description={detail.description} steps={detail.steps} />
      <div className="mt-5 rounded-lg border border-sky-100 bg-sky-50/80 p-5">
        <p className="text-[15px] leading-8 text-slate-600">
          选择 OpenAI Compatible / Custom Provider，API Key 填 CyberTruck AI 分组密钥，Base URL 填{" "}
          <code className="rounded bg-white px-1.5 py-1 font-mono text-neutral-950">{BASE_URL_V1}</code>。保存后选择对应模型即可。
        </p>
      </div>
      <div className="mt-5">
        <CodeBlock title={detail.codeTitle} code={detail.code} />
      </div>
    </section>
  );
}

function findActiveContent(activeId: string) {
  if (activeId === "cc-switch-setup") return { type: "ccswitch" as const };
  if (activeId === "claude-code-setup") return { type: "claude" as const };
  if (activeId === "codex-setup") return { type: "codex" as const };
  if (activeId === "gemini-setup") return { type: "gemini" as const };
  if (activeId === "zed-setup") return { type: "zed" as const };
  if (activeId === "direct-connect-tips") return { type: "direct" as const };

  const guide = clientCards.find((item) => item.id === activeId);
  if (guide) return { type: "guide" as const, guide };

  const client = simpleClients.find((item) => item.id === activeId);
  if (client) return { type: "simple" as const, client };

  return { type: "direct" as const };
}

function ContentPanel({ activeId }: { activeId: string }) {
  const content = findActiveContent(activeId);

  return (
    <article className="min-h-full rounded-lg border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
      {content.type === "direct" ? <DirectConnectSection /> : null}
      {content.type === "ccswitch" ? <CCSwitchGuide /> : null}
      {content.type === "claude" ? <ClaudeCodeGuide /> : null}
      {content.type === "codex" ? <CodexGuide /> : null}
      {content.type === "gemini" ? <GeminiGuide /> : null}
      {content.type === "zed" ? <ZedGuide /> : null}
      {content.type === "guide" ? <ClientGuideCard guide={content.guide} /> : null}
      {content.type === "simple" ? <SimpleClientCard id={content.client.id} label={content.client.label} /> : null}
      <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5 text-[15px] leading-7 text-slate-600">
        <p className="font-black text-neutral-950">常用地址</p>
        <p className="mt-2">
          控制台：<a className="font-bold text-slate-700 underline underline-offset-4" href={BASE_URL}>{BASE_URL}</a>
        </p>
        <p>
          Token：<a className="font-bold text-slate-700 underline underline-offset-4" href={TOKEN_URL}>{TOKEN_URL}</a>
        </p>
        <p>OpenAI Compatible：<code className="rounded bg-white px-1.5 py-1 font-mono text-neutral-950">{BASE_URL_V1}</code></p>
      </div>
    </article>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState("direct-connect-tips");

  return (
    <main className="h-screen overflow-hidden bg-slate-50">
      <MobileNav activeId={activeId} onSelect={setActiveId} />
      <div className="grid h-[calc(100vh-61px)] gap-8 overflow-hidden px-5 py-5 lg:h-screen lg:grid-cols-[308px_minmax(0,1fr)] lg:px-5">
        <Sidebar activeId={activeId} onSelect={setActiveId} />
        <div key={activeId} className="min-h-0 overflow-y-auto pr-1">
          <ContentPanel activeId={activeId} />
        </div>
      </div>
    </main>
  );
}



