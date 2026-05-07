"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useTheme } from "next-themes";
import {
  Copy,
  Check,
  ChevronUp,
  AlertTriangle,
  Info,
  Monitor,
  Apple,
  Laptop,
  ArrowRight,
  Moon,
  Sun,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BASE_URL = "https://cybertruckai.top";
const BASE_URL_V1 = "https://cybertruckai.top/v1";

const appear: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const platforms = [
  { id: "windows", label: "Windows", icon: Monitor },
  { id: "macos", label: "macOS", icon: Apple },
  { id: "linux", label: "Linux", icon: Laptop },
];

const navItems = [
  { id: "claude-code-setup", label: "Claude Code" },
  { id: "codex-setup", label: "Codex" },
  { id: "gemini-setup", label: "Gemini CLI" },
  { id: "codex2claude-setup", label: "Codex2Claude" },
  { id: "aider-setup", label: "Aider" },
  { id: "cline-setup", label: "Cline" },
  { id: "continue-setup", label: "Continue" },
  { id: "roocode-setup", label: "Roo Code" },
  { id: "tabnine-setup", label: "Tabnine CLI" },
  { id: "cursor-setup", label: "Cursor" },
  { id: "vscode-setup", label: "VS Code" },
  { id: "windsurf-setup", label: "Windsurf" },
  { id: "copilot-setup", label: "GitHub Copilot" },
  { id: "ccswitch-setup", label: "CCSwitch" },
  { id: "trae-setup", label: "Trae" },
];

function CodeBlock({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border bg-muted/50 overflow-hidden">
      <div className="flex items-center justify-between border-b px-4 py-2 text-xs">
        <span className="text-muted-foreground">{title}</span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={copied ? "已复制" : "复制代码"}
        >
          {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
          {copied ? "已复制" : "复制"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Alert({
  variant = "warning",
  title,
  children,
}: {
  variant?: "warning" | "info";
  title?: string;
  children: React.ReactNode;
}) {
  const style =
    variant === "warning"
      ? "border-amber-500/30 bg-amber-500/5 dark:border-amber-500/20"
      : "border-blue-500/30 bg-blue-500/5 dark:border-blue-500/20";

  const icon = variant === "warning" ? (
    <AlertTriangle className="size-4 text-amber-500 shrink-0" />
  ) : (
    <Info className="size-4 text-blue-500 shrink-0" />
  );

  return (
    <div className={`rounded-lg border p-4 text-sm ${style}`}>
      <div className="flex gap-3">
        {icon}
        <div className="space-y-1">
          {title && <p className="font-medium text-foreground">{title}</p>}
          <div className="text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  label,
  title,
  description,
  amount = 0.15,
}: {
  label: string;
  title: string;
  description: string;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={appear}
      className="max-w-3xl"
    >
      <p className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      <p className="mt-4 text-muted-foreground leading-7">{description}</p>
    </motion.div>
  );
}

function PlatformTabs({
  platforms: plats,
  active,
  onChange,
}: {
  platforms: { id: string; label: string; icon: React.ElementType }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border bg-muted/30 p-1">
      {plats.map((p) => {
        const isActive = p.id === active;
        return (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <p.icon className="size-4" />
            <span>{p.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Sticky Nav ── */
function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const { theme, setTheme } = useTheme();
  const navRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    const close = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-more-nav]")) setMoreOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [moreOpen]);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const calculate = () => {
      const containerWidth = el.clientWidth;
      if (containerWidth === 0) return;

      const moreWidth = 64;
      const themeBtn = el.parentElement?.querySelector('[aria-label="切换主题"]') as HTMLElement | null;
      const themeWidth = themeBtn?.offsetWidth ?? 40;
      const available = containerWidth - moreWidth - themeWidth - 8;

      let count = 0;
      let used = 0;
      for (let i = 0; i < navItems.length; i++) {
        const dom = itemsRef.current.get(navItems[i].id);
        if (!dom) break;
        const w = dom.offsetWidth;
        if (used + w + 4 <= available) {
          used += w + 4;
          count++;
        } else {
          break;
        }
      }
      setVisibleCount(Math.max(0, count));
    };

    calculate();

    const ro = new ResizeObserver(calculate);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const shownItems = navItems.slice(0, visibleCount);
  const hiddenItems = navItems.slice(visibleCount);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "border-b bg-background/80 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-background/70"
          : "border-b bg-background"
      }`}
    >
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div ref={navRef} className="flex items-center gap-1 overflow-hidden">
          {shownItems.map((item) => (
            <a
              ref={(el) => { if (el) itemsRef.current.set(item.id, el); }}
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}

          {hiddenItems.length > 0 && (
            <div className="relative shrink-0" data-more-nav>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground whitespace-nowrap"
              >
                更多 ▾
              </button>
              {moreOpen && (
                <div className="absolute top-full mt-1 left-0 rounded-lg border bg-popover p-1 shadow-lg min-w-[160px] z-50">
                  {hiddenItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground whitespace-nowrap"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="ml-2 flex size-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-muted"
          aria-label="切换主题"
        >
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
      </div>
    </nav>
  );
}

/* ── Back to Top ── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed bottom-6 right-6 z-50 flex size-10 items-center justify-center rounded-full border bg-background shadow-lg transition-colors hover:bg-muted"
      aria-label="回到顶部"
    >
      <ChevronUp className="size-5" />
    </motion.a>
  );
}

/* ── Right TOC ── */
function RightTOC() {
  const [activeId, setActiveId] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-1.5">
      {navItems.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`group flex items-center gap-2 transition-all duration-200 ${
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span
              className={`block h-2 w-2 rounded-full transition-all duration-200 ${
                isActive ? "bg-primary scale-125" : "bg-muted-foreground/40 group-hover:bg-muted-foreground group-hover:scale-110"
              }`}
            />
            <span
              className={`text-xs transition-all duration-200 ${
                isActive ? "font-medium opacity-100 translate-x-0" : "opacity-100 translate-x-0 group-hover:font-medium"
              }`}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="bg-background text-foreground">
      <StickyNav />
      <RightTOC />

      {/* Hero */}
      <section className="border-b">
        <div className="container mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:py-24">
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-8"
          >
            <motion.div variants={appear} className="flex flex-wrap gap-3">
              <Badge variant="secondary">AI 中转站教程</Badge>
              <Badge variant="secondary">CyberTruck AI</Badge>
              <Badge variant="secondary">15+ 工具支持</Badge>
            </motion.div>

            <motion.div variants={appear} className="max-w-4xl">
              <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
                Claude Code · Codex · Gemini CLI · Aider · Cline
                <span className="block text-muted-foreground mt-2">
                  按量计费，专为开发者和团队提供的高质量 API 服务教程
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={appear}
              className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg"
            >
              让 AI 编程更高效，让开发更简单。统一基址：{BASE_URL}
            </motion.p>

            <motion.div variants={appear} className="flex flex-wrap gap-3">
              <a href="#claude-code-setup">
                <Button>
                  查看安装指南
                  <ArrowRight className="size-4 ml-1" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Claude Code Setup */}
      <ClaudeCodeSetup />

      {/* Codex Setup */}
      <CodexSetup />

      {/* Gemini Setup */}
      <GeminiSetup />

      {/* Codex2Claude */}
      <Codex2ClaudeSetup />

      {/* Aider */}
      <AiderSetup />

      {/* Cline */}
      <ClineSetup />

      {/* Continue */}
      <ContinueSetup />

      {/* Roo Code */}
      <RooCodeSetup />

      {/* Tabnine CLI */}
      <TabnineSetup />

      {/* Cursor */}
      <CursorSetup />

      {/* VS Code */}
      <VsCodeSetup />

      {/* Windsurf */}
      <WindsurfSetup />

      {/* GitHub Copilot */}
      <CopilotSetup />

      {/* CCSwitch */}
      <CCSwitchSetup />

      {/* Trae */}
      <TraeSetup />

      {/* Footer */}
      <section className="border-t">
        <div className="container mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-10 text-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} CyberTruck AI CLI 教程</p>
          <p className="text-xs text-muted-foreground">基址：<a href={BASE_URL} className="underline underline-offset-4 hover:text-foreground">{BASE_URL}</a></p>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}

/* ── Claude Code Setup ── */
function ClaudeCodeSetup() {
  const reduceMotion = useReducedMotion();
  const [platform, setPlatform] = useState("windows");

  return (
    <section id="claude-code-setup" className="scroll-mt-16 border-t">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle
            label="安装教程"
            title="Claude Code 安装步骤"
            description="详细的多平台安装指南"
          />

          {/* Quick Steps */}
          <motion.div variants={appear}>
            <Card>
              <CardHeader>
                <CardTitle>Claude Code 快速开始</CardTitle>
                <CardDescription>Anthropic 官方 CLI 工具，面向高效开发流程。</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {["1 安装 CLI", "2 配置密钥", "3 开始编程"].map((s) => (
                    <Badge key={s} variant="secondary">{s}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Platform Tabs */}
          <motion.div variants={appear}>
            <PlatformTabs platforms={platforms} active={platform} onChange={setPlatform} />
          </motion.div>

          {platform === "windows" && (
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">Windows 版本教程</h3>
                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">系统要求</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Windows 10 或 Windows 11</li>
                    <li>Node.js 18+</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">1 安装 Node.js</h4>
                <p className="text-sm text-muted-foreground">
                  1. 访问 <a href="https://nodejs.org/" className="underline">https://nodejs.org/</a><br />
                  2. 下载 LTS 版本的 Windows Installer (.msi)<br />
                  3. 运行安装程序，按默认设置完成安装<br />
                  4. 安装程序会自动添加到 PATH 环境变量
                </p>
                <CodeBlock
                  title="验证安装（CMD/PowerShell 管理员模式）"
                  code={`node --version\nnpm --version`}
                />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">2 安装 Claude Code CLI</h4>
                <p className="text-sm text-muted-foreground">打开命令提示符（以管理员身份运行）或 PowerShell：</p>
                <CodeBlock
                  title="CMD/PowerShell"
                  code={`npm install -g @anthropic-ai/claude-code`}
                />
                <CodeBlock
                  title="验证安装"
                  code={`claude --version`}
                />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">3 配置 CyberTruck AI</h4>
                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">3.1 获取 Auth Token</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>访问 CyberTruck AI 控制台 <a href={`${BASE_URL}/console/token`} className="underline">{BASE_URL}/console/token</a></li>
                    <li>点击「创建密钥」</li>
                    <li>密钥名称：随意填写</li>
                    <li>密钥分组请选择：Claude Code 相关分组</li>
                    <li>额度建议：设置为无限额度</li>
                    <li>其他选项保持默认</li>
                  </ol>
                </div>

                <Alert variant="warning" title="重要提示">
                  请将下方的 ANTHROPIC_AUTH_TOKEN 替换为您在 {BASE_URL}/console/token 生成的 Claude Code API 密钥！
                </Alert>

                <p className="text-sm text-muted-foreground">
                  settings.json 位置（Windows）：<code className="bg-muted px-1 rounded">{`%USERPROFILE%\\.claude\\settings.json`}</code>
                </p>

                <CodeBlock
                  title="settings.json 配置（推荐，永久生效）"
                  code={`{\n  "env": {\n    "ANTHROPIC_AUTH_TOKEN": "粘贴为 Claude Code 分组密钥 key",\n    "ANTHROPIC_BASE_URL": "${BASE_URL}"\n  }\n}`}
                />
                <p className="text-xs text-muted-foreground">注意：配置文件修改后需要重启 Claude Code 才生效。</p>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">4 启动 Claude Code</h4>
                <CodeBlock
                  title="进入工程目录"
                  code={`cd your-project-folder`}
                />
                <CodeBlock
                  title="启动"
                  code={`claude`}
                />
              </div>
            </motion.div>
          )}

          {platform === "macos" && (
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">macOS 版本教程</h3>
                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">系统要求</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>macOS 12+ (Monterey)</li>
                    <li>Node.js 18+（推荐通过 Homebrew 安装）</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">1 安装 Node.js</h4>
                <CodeBlock title="通过 Homebrew 安装" code={`brew install node`} />
                <CodeBlock title="验证安装" code={`node --version\nnpm --version`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">2 安装 Claude Code CLI</h4>
                <CodeBlock title="Terminal" code={`npm install -g @anthropic-ai/claude-code`} />
                <CodeBlock title="验证安装" code={`claude --version`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">3 配置 CyberTruck AI</h4>
                <p className="text-sm text-muted-foreground">
                  settings.json 位置（macOS）：<code className="bg-muted px-1 rounded">~/.claude/settings.json</code>
                </p>
                <CodeBlock
                  title="settings.json 配置"
                  code={`{\n  "env": {\n    "ANTHROPIC_AUTH_TOKEN": "粘贴为 Claude Code 分组密钥 key",\n    "ANTHROPIC_BASE_URL": "${BASE_URL}"\n  }\n}`}
                />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">4 启动 Claude Code</h4>
                <CodeBlock title="进入工程目录" code={`cd your-project-folder`} />
                <CodeBlock title="启动" code={`claude`} />
              </div>
            </motion.div>
          )}

          {platform === "linux" && (
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">Linux 版本教程</h3>
                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">系统要求</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>主流 Linux 发行版（Ubuntu 20.04+, Debian, Fedora, Arch 等）</li>
                    <li>Node.js 18+</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">1 安装 Node.js</h4>
                <CodeBlock
                  title="Ubuntu/Debian"
                  code={`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -\nsudo apt-get install -y nodejs`}
                />
                <CodeBlock title="验证安装" code={`node --version\nnpm --version`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">2 安装 Claude Code CLI</h4>
                <CodeBlock title="Terminal" code={`sudo npm install -g @anthropic-ai/claude-code`} />
                <CodeBlock title="验证安装" code={`claude --version`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">3 配置 CyberTruck AI</h4>
                <p className="text-sm text-muted-foreground">
                  settings.json 位置（Linux）：<code className="bg-muted px-1 rounded">~/.claude/settings.json</code>
                </p>
                <CodeBlock
                  title="settings.json 配置"
                  code={`{\n  "env": {\n    "ANTHROPIC_AUTH_TOKEN": "粘贴为 Claude Code 分组密钥 key",\n    "ANTHROPIC_BASE_URL": "${BASE_URL}"\n  }\n}`}
                />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">4 启动 Claude Code</h4>
                <CodeBlock title="进入工程目录" code={`cd your-project-folder`} />
                <CodeBlock title="启动" code={`claude`} />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Codex Setup ── */
function CodexSetup() {
  const reduceMotion = useReducedMotion();
  const [platform, setPlatform] = useState("windows");

  return (
    <section id="codex-setup" className="scroll-mt-16 border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle
            label="安装教程"
            title="Codex CLI 安装步骤"
            description="OpenAI 风格 CLI 分平台安装指南"
          />

          <motion.div variants={appear}>
            <Card>
              <CardHeader>
                <CardTitle>Codex 快速开始</CardTitle>
                <CardDescription>强大的 OpenAI 代码助手，支持工程级任务。</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {["1 环境准备", "2 安装配置", "3 开始编程"].map((s) => (
                    <Badge key={s} variant="secondary">{s}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={appear}>
            <PlatformTabs platforms={platforms} active={platform} onChange={setPlatform} />
          </motion.div>

          {platform === "windows" && (
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">Windows 版本教程</h3>
                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">系统要求</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Windows 10 或 Windows 11</li>
                    <li>Node.js 18+</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">1 安装 Node.js</h4>
                <CodeBlock title="验证安装" code={`node --version\nnpm --version`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">2 全局安装 Codex CLI</h4>
                <CodeBlock title="CMD/PowerShell" code={`npm install -g @openai/codex@latest`} />
                <CodeBlock title="验证安装" code={`codex --version`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">3 配置 CyberTruck AI</h4>

                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">3.1 获取 Codex 专用 API Token</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>访问 {BASE_URL}/console/token</li>
                    <li>点击「创建密钥」</li>
                    <li>密钥分组请选择：Codex 相关分组</li>
                    <li>额度建议：设置为无限额度</li>
                  </ol>
                </div>

                <Alert variant="warning" title="重要">
                  Codex 需要使用专门的分组令牌，与 Claude Code 的令牌不同！
                </Alert>

                <div className="flex flex-col gap-4">
                  <h5 className="font-medium">3.2 创建配置文件夹</h5>
                  <CodeBlock
                    title="CMD/PowerShell"
                    code={`mkdir %USERPROFILE%\\.codex\ncd %USERPROFILE%\\.codex`}
                  />
                  <p className="text-xs text-muted-foreground">
                    安装 Codex 后，.codex 默认位于 <code className="bg-muted px-1 rounded">%USERPROFILE%</code> 目录下。
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h5 className="font-medium">3.3 创建 config.toml</h5>
                  <CodeBlock
                    title="config.toml"
                    code={`approval_policy = "never"
sandbox_mode = "danger-full-access"
model_provider = "cybertruckai"
model = "gpt-5.4"
model_reasoning_effort = "xhigh"
plan_mode_reasoning_effort = "xhigh"
model_reasoning_summary = "detailed"
network_access = "enabled"
disable_response_storage = true
windows_wsl_setup_acknowledged = true
model_verbosity = "high"

[model_providers.cybertruckai]
name = "cybertruckai"
base_url = "${BASE_URL}"
wire_api = "responses"
requires_openai_auth = true`}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <h5 className="font-medium">3.4 创建 auth.json</h5>
                  <CodeBlock
                    title="auth.json"
                    code={`{\n  "OPENAI_API_KEY": "粘贴为 Codex 专用分组密钥 key"\n}`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">4 启动 Codex</h4>
                <CodeBlock title="进入工程目录" code={`mkdir my-codex-project\ncd my-codex-project`} />
                <CodeBlock title="启动" code={`codex`} />
              </div>
            </motion.div>
          )}

          {platform === "macos" && (
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">macOS 版本教程</h3>
                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">系统要求</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>macOS 12+ (Monterey)</li>
                    <li>Node.js 18+</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">1 安装 Node.js</h4>
                <CodeBlock title="Terminal" code={`brew install node`} />
                <CodeBlock title="验证" code={`node --version\nnpm --version`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">2 安装 Codex CLI</h4>
                <CodeBlock title="Terminal" code={`npm install -g @openai/codex@latest`} />
                <CodeBlock title="验证" code={`codex --version`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">3 配置 CyberTruck AI</h4>
                <p className="text-sm text-muted-foreground">
                  配置目录：<code className="bg-muted px-1 rounded">~/.codex/</code>
                </p>
                <CodeBlock
                  title="config.toml"
                  code={`approval_policy = "never"
sandbox_mode = "danger-full-access"
model_provider = "cybertruckai"
model = "gpt-5.4"
model_reasoning_effort = "xhigh"

[model_providers.cybertruckai]
name = "cybertruckai"
base_url = "${BASE_URL}"
wire_api = "responses"
requires_openai_auth = true`}
                />
                <CodeBlock
                  title="auth.json"
                  code={`{\n  "OPENAI_API_KEY": "粘贴为 Codex 专用分组密钥 key"\n}`}
                />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">4 启动 Codex</h4>
                <CodeBlock title="启动" code={`cd my-codex-project\ncodex`} />
              </div>
            </motion.div>
          )}

          {platform === "linux" && (
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">Linux 版本教程</h3>
                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">系统要求</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>主流 Linux 发行版</li>
                    <li>Node.js 18+</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">1 安装 Node.js</h4>
                <CodeBlock
                  title="Ubuntu/Debian"
                  code={`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -\nsudo apt-get install -y nodejs`}
                />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">2 安装 Codex CLI</h4>
                <CodeBlock title="Terminal" code={`sudo npm install -g @openai/codex@latest`} />
                <CodeBlock title="验证" code={`codex --version`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">3 配置 CyberTruck AI</h4>
                <p className="text-sm text-muted-foreground">
                  配置目录：<code className="bg-muted px-1 rounded">~/.codex/</code>
                </p>
                <CodeBlock
                  title="config.toml + auth.json"
                  code={`# 创建配置目录
mkdir -p ~/.codex

# config.toml
cat > ~/.codex/config.toml << 'EOF'
approval_policy = "never"
sandbox_mode = "danger-full-access"
model_provider = "cybertruckai"
model = "gpt-5.4"

[model_providers.cybertruckai]
name = "cybertruckai"
base_url = "${BASE_URL}"
wire_api = "responses"
requires_openai_auth = true
EOF

# auth.json
cat > ~/.codex/auth.json << 'EOF'
{
  "OPENAI_API_KEY": "粘贴为 Codex 专用分组密钥 key"
}
EOF`}
                />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">4 启动 Codex</h4>
                <CodeBlock title="启动" code={`cd my-codex-project\ncodex`} />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Gemini CLI Setup ── */
function GeminiSetup() {
  const reduceMotion = useReducedMotion();
  const [platform, setPlatform] = useState("windows");

  return (
    <section id="gemini-setup" className="scroll-mt-16 border-t">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle
            label="安装教程"
            title="Gemini CLI 安装步骤"
            description="Gemini 命令行分平台安装指南"
          />

          <motion.div variants={appear}>
            <Card>
              <CardHeader>
                <CardTitle>Gemini CLI 快速开始</CardTitle>
                <CardDescription>Google 命令行 AI 工具，快速接入即可使用。</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {["1 安装 CLI", "2 配置 API", "3 开始体验"].map((s) => (
                    <Badge key={s} variant="secondary">{s}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={appear}>
            <PlatformTabs platforms={platforms} active={platform} onChange={setPlatform} />
          </motion.div>

          {platform === "windows" && (
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">Windows 版本教程</h3>
                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">系统要求</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Windows 10 或 Windows 11</li>
                    <li>Node.js 18+</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">1 安装 Node.js</h4>
                <CodeBlock title="验证安装" code={`node --version\nnpm --version`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">2 全局安装 Gemini CLI</h4>
                <CodeBlock title="CMD/PowerShell" code={`npm install -g @google/gemini-cli`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">3 配置 Gemini CLI</h4>

                <Alert variant="warning" title="重要提示">
                  请将下方的 GEMINI_API_KEY 替换为您在 {BASE_URL}/console/token 生成的 Gemini CLI 专用 API 密钥！
                </Alert>

                <p className="text-sm text-muted-foreground">
                  配置位置：<code className="bg-muted px-1 rounded">{`%USERPROFILE%\\.gemini\\`}</code>
                </p>

                <CodeBlock
                  title=".env"
                  code={`GOOGLE_GEMINI_BASE_URL=${BASE_URL}
GEMINI_API_KEY=粘贴为 Gemini CLI 相关分组密钥 key
GEMINI_MODEL=gemini-3-pro-preview`}
                />

                <CodeBlock
                  title="settings.json"
                  code={`{\n  "ide": {\n    "enabled": true\n  },\n  "security": {\n    "auth": {\n      "selectedType": "gemini-api-key"\n    }\n  }\n}`}
                />
                <p className="text-xs text-muted-foreground">注意：配置文件修改后需要重启 Gemini CLI 才生效。</p>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">4 启动 Gemini CLI</h4>
                <CodeBlock title="启动" code={`gemini`} />
              </div>
            </motion.div>
          )}

          {platform === "macos" && (
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">macOS 版本教程</h3>
                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">系统要求</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>macOS 12+</li>
                    <li>Node.js 18+</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">1 安装 Node.js</h4>
                <CodeBlock title="Terminal" code={`brew install node\nnode --version`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">2 安装 Gemini CLI</h4>
                <CodeBlock title="Terminal" code={`npm install -g @google/gemini-cli`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">3 配置</h4>
                <p className="text-sm text-muted-foreground">
                  配置目录：<code className="bg-muted px-1 rounded">~/.gemini/</code>
                </p>
                <CodeBlock
                  title=".env"
                  code={`GOOGLE_GEMINI_BASE_URL=${BASE_URL}
GEMINI_API_KEY=替换为 Gemini CLI 专用密钥
GEMINI_MODEL=gemini-3-pro-preview`}
                />
                <CodeBlock
                  title="settings.json"
                  code={`{\n  "ide": { "enabled": true },\n  "security": { "auth": { "selectedType": "gemini-api-key" } }\n}`}
                />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">4 启动</h4>
                <CodeBlock title="Terminal" code={`gemini`} />
              </div>
            </motion.div>
          )}

          {platform === "linux" && (
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">Linux 版本教程</h3>
                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">系统要求</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>主流 Linux 发行版</li>
                    <li>Node.js 18+</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">1 安装 Node.js</h4>
                <CodeBlock title="Ubuntu/Debian" code={`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -\nsudo apt-get install -y nodejs`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">2 安装 Gemini CLI</h4>
                <CodeBlock title="Terminal" code={`sudo npm install -g @google/gemini-cli`} />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">3 配置</h4>
                <CodeBlock
                  title="创建配置"
                  code={`mkdir -p ~/.gemini

cat > ~/.gemini/.env << 'EOF'
GOOGLE_GEMINI_BASE_URL=${BASE_URL}
GEMINI_API_KEY=替换为 Gemini CLI 专用密钥
GEMINI_MODEL=gemini-3-pro-preview
EOF

cat > ~/.gemini/settings.json << 'EOF'
{
  "ide": { "enabled": true },
  "security": { "auth": { "selectedType": "gemini-api-key" } }
}
EOF`}
                />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-semibold">4 启动</h4>
                <CodeBlock title="Terminal" code={`gemini`} />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Codex2Claude Setup ── */
function Codex2ClaudeSetup() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="codex2claude-setup" className="scroll-mt-16 border-t">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle label="桥接配置" title="Codex → Claude Code 桥接配置" description="适用于你想继续使用 Claude Code 客户端，但后端实际走 Codex / GPT-5.4 模型的场景。" />
          <motion.div variants={appear}>
            <Card>
              <CardContent className="flex flex-col gap-4 pt-6">
                <Alert variant="info">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>必须使用 Codex 专用密钥，不要使用 Claude Code 分组密钥</li>
                    <li>Base URL 使用站点根地址，不要追加 <code className="bg-muted px-1 rounded">/v1</code></li>
                    <li>修改 <code className="bg-muted px-1 rounded">settings.json</code> 后，需要完全重启 Claude Code 才生效</li>
                  </ul>
                </Alert>
                <CodeBlock title="Codex2Claude 配置示例（settings.json）" code={`{
  "env": {
    "ANTHROPIC_API_KEY": "替换为你创建的 Codex key",
    "ANTHROPIC_BASE_URL": "${BASE_URL}",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "gpt-5.4-low",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "gpt-5.4-xhigh-fast",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "gpt-5.4-high",
    "ANTHROPIC_MODEL": "gpt-5.4-xhigh",
    "ANTHROPIC_REASONING_MODEL": "gpt-5.4-xhigh",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "DISABLE_ERROR_REPORTING": "1",
    "DISABLE_TELEMETRY": "1",
    "MCP_TIMEOUT": "60000"
  },
  "model": "gpt-5.4-xhigh",
  "skipDangerousModePermissionPrompt": true
}`} />
                <p className="text-xs text-muted-foreground">保存后完全退出并重启 Claude Code。</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Aider Setup ── */
function AiderSetup() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="aider-setup" className="scroll-mt-16 border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle label="安装教程" title="Aider 安装配置" description="终端 AI 结对编程工具，支持任意 OpenAI 兼容 API。" />
          <motion.div variants={appear} className="flex flex-col gap-4">
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
              <li>安装 Aider：<code className="bg-muted px-1 rounded">pip install aider-chat</code></li>
              <li>设置环境变量或使用命令行参数指定 API</li>
              <li>在项目目录中启动 Aider</li>
            </ol>
            <CodeBlock title="安装 Aider" code={`pip install aider-chat`} />
            <CodeBlock title="启动并指定 API（推荐方式）" code={`# 使用自定义 API
aider --model openai/gpt-4 \\
  --openai-api-base ${BASE_URL_V1} \\
  --openai-api-key 你的API密钥

# 或使用环境变量
export OPENAI_API_BASE="${BASE_URL_V1}"
export OPENAI_API_KEY="你的API密钥"
aider --model openai/gpt-4`} />
            <Alert variant="info">
              <p>Aider 支持多种模型（Claude、GPT-4、Gemini 等），通过 <code className="bg-muted px-1 rounded">--model</code> 参数切换。使用 OpenAI 兼容格式时，模型名称填 <code className="bg-muted px-1 rounded">openai/模型名</code>。</p>
            </Alert>
            <CodeBlock title="Claude 模型示例" code={`aider --model openai/claude-sonnet-4-5 \\
  --openai-api-base ${BASE_URL_V1} \\
  --openai-api-key 你的API密钥`} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Cline Setup ── */
function ClineSetup() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="cline-setup" className="scroll-mt-16 border-t">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle label="VS Code 扩展" title="Cline 配置" description="VS Code 最强大的 AI 编程扩展之一，支持 OpenAI 兼容 API。" />
          <motion.div variants={appear} className="flex flex-col gap-4">
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
              <li>VS Code 扩展商店搜索 <strong>Cline</strong> 并安装</li>
              <li>点击左侧栏 Cline 图标打开面板</li>
              <li>点击 <strong>API Configuration</strong> 进入设置</li>
              <li>API Provider 选择 <strong>OpenAI Compatible</strong></li>
              <li>填写 Base URL 和 API Key</li>
              <li>选择模型后点击 Done 完成配置</li>
            </ol>
            <div className="rounded-lg border p-3 text-sm">
              <p className="font-medium mb-2">配置参数</p>
              <div className="space-y-1 text-muted-foreground">
                <p><strong>API Provider:</strong> OpenAI Compatible</p>
                <p><strong>Base URL:</strong> <code className="bg-muted px-1 rounded">{BASE_URL_V1}</code></p>
                <p><strong>API Key:</strong> 你的分组密钥</p>
                <p><strong>Model ID:</strong> 根据需求选择（如 claude-sonnet-4-5）</p>
              </div>
            </div>
            <Alert variant="info">
              <p>Cline 提供 <strong>Plan/Act 双模式</strong>：Plan 模式只规划不执行，适合方案设计；Act 模式直接创建/修改文件，适合自动化任务。</p>
            </Alert>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Continue Setup ── */
function ContinueSetup() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="continue-setup" className="scroll-mt-16 border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle label="开源 AI 助手" title="Continue 配置" description="开源 AI 代码助手，支持 VS Code 和 JetBrains IDE。" />
          <motion.div variants={appear} className="flex flex-col gap-4">
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
              <li>安装 Continue 扩展/插件</li>
              <li>打开 Continue 配置文件 <code className="bg-muted px-1 rounded">config.json</code></li>
              <li>添加自定义模型配置</li>
              <li>保存后重启 IDE</li>
            </ol>
            <CodeBlock title="Continue config.json 配置" code={`{
  "models": [
    {
      "title": "CyberTruck AI - GPT-4",
      "provider": "openai",
      "model": "gpt-4",
      "apiBase": "${BASE_URL_V1}",
      "apiKey": "你的API密钥"
    }
  ],
  "tabAutocompleteModel": {
    "title": "CyberTruck AI - 补全",
    "provider": "openai",
    "model": "gpt-4",
    "apiBase": "${BASE_URL_V1}",
    "apiKey": "你的API密钥"
  }
}`} />
            <div className="rounded-lg border p-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">配置文件位置</p>
              <p><strong>VS Code:</strong> <code className="bg-muted px-1 rounded">~/.continue/config.json</code></p>
              <p><strong>JetBrains:</strong> 设置 → Continue → 编辑配置</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Roo Code Setup ── */
function RooCodeSetup() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="roocode-setup" className="scroll-mt-16 border-t">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle label="VS Code 扩展" title="Roo Code 配置" description="Cline 的分支版本，同样支持 OpenAI 兼容 API。" />
          <motion.div variants={appear} className="flex flex-col gap-4">
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
              <li>VS Code 扩展商店搜索 <strong>Roo Code</strong> 并安装</li>
              <li>点击 Roo Code 图标打开面板</li>
              <li>进入 API 设置页面</li>
              <li>API Provider 选择 <strong>OpenAI Compatible</strong></li>
              <li>填写配置信息</li>
            </ol>
            <div className="rounded-lg border p-3 text-sm">
              <p className="font-medium mb-2">配置参数</p>
              <div className="space-y-1 text-muted-foreground">
                <p><strong>API Provider:</strong> OpenAI Compatible</p>
                <p><strong>Base URL:</strong> <code className="bg-muted px-1 rounded">{BASE_URL_V1}</code></p>
                <p><strong>API Key:</strong> 你的分组密钥</p>
              </div>
            </div>
            <Alert variant="info">
              <p>Roo Code 与 Cline 配置方式基本一致，界面和功能略有不同。如果 Cline 无法满足需求，可以尝试 Roo Code 作为替代方案。</p>
            </Alert>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Tabnine CLI Setup ── */
function TabnineSetup() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="tabnine-setup" className="scroll-mt-16 border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle label="终端 AI 编码代理" title="Tabnine CLI 安装" description="2026 年新推出的终端原生 AI 编码代理。" />
          <motion.div variants={appear} className="flex flex-col gap-4">
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
              <li>注册 Tabnine 企业账号</li>
              <li>通过 npm 安装 Tabnine CLI</li>
              <li>登录并配置 API 端点</li>
              <li>在项目目录中启动</li>
            </ol>
            <CodeBlock title="安装 Tabnine CLI" code={`npm install -g tabnine-cli`} />
            <CodeBlock title="登录配置" code={`tabnine login
# 按照提示输入 API Key
# 配置自定义 API 端点
tabnine config set api-base-url ${BASE_URL_V1}`} />
            <CodeBlock title="启动 Tabnine CLI" code={`# 进入项目目录
cd your-project

# 启动交互模式
tabnine

# 或使用 yolo mode（自动执行）
tabnine --yolo`} />
            <Alert variant="info">
              <p>Tabnine CLI 支持<strong>交互模式</strong>和<strong>yolo mode</strong>两种运行方式。yolo mode 会自动执行命令和修改文件，适合 CI/CD 流程中使用。</p>
            </Alert>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Cursor Setup ── */
function CursorSetup() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="cursor-setup" className="scroll-mt-16 border-t">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle label="编辑器配置" title="Cursor 配置" description="Cursor 自定义 API 路由使用 OpenAI 兼容格式，接入简单高效。" />
          <motion.div variants={appear} className="flex flex-col gap-4">
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
              <li>进入 Cursor Settings → Models，确保你是 Cursor Pro 账号</li>
              <li>打开 OpenAI API Key 开关，粘贴在后台创建的 key</li>
              <li>打开 Override OpenAI Base URL，填写：<code className="bg-muted px-1 rounded">{BASE_URL_V1}</code></li>
              <li>Claude 系列直接在 Cursor 模型列表中选择；GPT 系列需要 Add model 输入自定义模型名称</li>
            </ol>
            <CodeBlock title="Cursor Base URL" code={BASE_URL_V1} />
            <div className="rounded-lg border p-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">Claude 模型说明</p>
              <p>Claude 模型不需要输入自定义模型名，直接在 Cursor 自带模型列表中选择即可。</p>
            </div>
            <div className="rounded-lg border p-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">GPT 模型说明</p>
              <p>在 <code className="bg-muted px-1 rounded">Add or search model</code> 里输入自定义模型名称。基础模型不带强度后缀；强度模型在末尾追加 <code className="bg-muted px-1 rounded">-low/-medium/-high/-xhigh</code>。</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── VS Code Setup ── */
function VsCodeSetup() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="vscode-setup" className="scroll-mt-16 border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle label="插件安装" title="VS Code Codex 插件" description="适合使用 VSCode 图形界面安装 Codex 插件，并通过 API Key 登录的用户。" />
          <motion.div variants={appear} className="flex flex-col gap-4">
            <ol className="list-decimal pl-5 space-y-3 text-sm text-muted-foreground">
              <li>VSCode 打开后，先选择任意项目文件夹进入工作区</li>
              <li>打开左侧插件扩展界面</li>
              <li>搜索 Codex，出现插件后点击安装</li>
              <li>安装后侧栏会出现 Codex 入口</li>
              <li>安装完成后，配置 Codex 的全局配置文件</li>
            </ol>
            <div className="rounded-lg border p-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">配置文件路径</p>
              <p>Windows：<code className="bg-muted px-1 rounded">{`%USERPROFILE%\\.codex\\`}</code></p>
              <p>macOS / Linux：<code className="bg-muted px-1 rounded">~/.codex/</code></p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Windsurf Setup ── */
function WindsurfSetup() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="windsurf-setup" className="scroll-mt-16 border-t">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle label="编辑器配置" title="Windsurf 配置" description="Codeium 生态编辑器接入指南。" />
          <motion.div variants={appear} className="flex flex-col gap-4">
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
              <li>打开 Windsurf 设置</li>
              <li>找到 Custom Provider 或 Custom Endpoint 设置项</li>
              <li>Base URL 填写：<code className="bg-muted px-1 rounded">{BASE_URL_V1}</code></li>
              <li>填入你的 API Key</li>
              <li>选择对应模型后保存</li>
            </ol>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── GitHub Copilot Setup ── */
function CopilotSetup() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="copilot-setup" className="scroll-mt-16 border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle label="插件配置" title="GitHub Copilot 配置" description="通过 VS Code 插件配置接入。" />
          <motion.div variants={appear}>
            <CodeBlock title="VS Code settings.json" code={`{
  "github.copilot.advanced": {
    "apiBaseUrl": "${BASE_URL_V1}",
    "apiKey": "your-api-key"
  }
}`} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── CCSwitch Setup ── */
function CCSwitchSetup() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="ccswitch-setup" className="scroll-mt-16 border-t">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle label="代理切换" title="CCSwitch 代理切换配置" description="快速切换 Claude Code / 代理配置，适合多账号场景。" />
          <motion.div variants={appear} className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              CCSwitch 主要用于在多个 API 配置之间快速切换。你可以在配置文件中预设多个入口，然后通过命令行或快捷键快速切换。
            </p>
            <CodeBlock title="示例配置结构" code={`{
  "profiles": {
    "cybertruckai": {
      "base_url": "${BASE_URL}",
      "api_key": "your-key"
    },
    "official": {
      "base_url": "https://api.anthropic.com",
      "api_key": "your-official-key"
    }
  },
  "active": "cybertruckai"
}`} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Trae Setup ── */
function TraeSetup() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="trae-setup" className="scroll-mt-16 border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <SectionTitle label="编辑器配置" title="Trae / Trae CN / Trae Solo 接入" description="字节跳动旗下 AI 原生 IDE 系列，Trae、Trae CN、Trae Solo 的接入方式一致。" />
          <motion.div variants={appear} className="flex flex-col gap-4">
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
              <li>打开 Trae 编辑器设置</li>
              <li>找到 AI 助手或模型配置选项</li>
              <li>选择自定义 API 接入方式</li>
              <li>Base URL 填写：<code className="bg-muted px-1 rounded">{BASE_URL_V1}</code></li>
              <li>填入你的 API Key</li>
              <li>选择对应模型后保存</li>
            </ol>
            <Alert variant="info">
              <p>Trae 系列（Trae、Trae CN、Trae Solo）均为字节跳动旗下产品，接入方式完全一致。不同版本仅在模型预设和功能侧重上有所差异，不影响 API 配置流程。</p>
            </Alert>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
