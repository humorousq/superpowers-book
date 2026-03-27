# 第八章：跨平台兼容性

本章介绍如何处理不同平台的兼容性问题，确保技能在各平台上正常工作。

## 支持的平台

Superpowers 支持多个 AI 编码代理平台：

- Claude Code
- Cursor
- Codex
- OpenCode
- Gemini CLI

每个平台都有其独特的工具 API 和行为特性。

## 兼容性挑战

### 1. 工具 API 差异

不同平台的工具 API 可能不同：

**Claude Code**:
```javascript
// 使用 TodoWrite 工具
TodoWrite({ taskId: "1", status: "completed" })

// 使用 Task 工具分发子代理
Task({ subagent_type: "general-purpose", prompt: "..." })
```

**OpenCode**:
```javascript
// 使用 todowrite 工具（小写）
todowrite({ taskId: "1", status: "completed" })

// 使用 @mention 系统而非 Task 工具
```

### 2. 文件系统差异

**Windows**:
- 路径分隔符: `\`
- 文件权限不同
- Junction vs Symlink

**Unix/macOS**:
- 路径分隔符: `/`
- 标准 POSIX 权限
- 原生 symlink 支持

### 3. Shell 差异

**Bash/Zsh**:
```bash
export VAR=value
source script.sh
```

**PowerShell**:
```powershell
$env:VAR = "value"
. script.ps1
```

**Windows CMD**:
```cmd
set VAR=value
call script.bat
```

## Polyglot Hooks

Superpowers 使用 Polyglot Hooks 来处理跨平台脚本。

### 什么是 Polyglot Hook？

Polyglot Hook 是一个可以在多个 shell 中执行的脚本文件：

```bash
#!/bin/bash
# 前面是 bash 代码
: << 'POWERSHELL'
# PowerShell 代码在 bash 中被忽略
POWERSHELL
#<powershell>
# PowerShell 专用代码
#</powershell>
```

### 示例：跨平台环境设置

```bash
#!/bin/bash
# Polyglot hook for setting up environment

# Bash/Zsh
if [ -n "$BASH_VERSION" ] || [ -n "$ZSH_VERSION" ]; then
    export PATH="$HOME/.local/bin:$PATH"
    source ~/.bashrc 2>/dev/null || source ~/.zshrc 2>/dev/null
fi

# PowerShell
#<powershell>
if ($PSVersionTable) {
    $env:PATH = "$env:USERPROFILE\.local\bin;$env:PATH"
    . $PROFILE
}
#</powershell>
```

## 平台特定配置

### Codex 适配

Codex 的技能发现机制不同：

```javascript
// Codex 使用 ~/.agents/skills/ 目录
// 需要创建符号链接

mkdir -p ~/.agents/skills
ln -s ~/.codex/superpowers/skills ~/.agents/skills/superpowers
```

### OpenCode 适配

OpenCode 使用插件系统：

```json
// opencode.json
{
  "plugin": ["superpowers@git+https://github.com/obra/superpowers.git"]
}
```

### Windows Junction

Windows 上使用 Junction 代替 Symlink（无需开发者模式）：

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
cmd /c mklink /J "$env:USERPROFILE\.agents\skills\superpowers" "$env:USERPROFILE\.codex\superpowers\skills"
```

## 最佳实践

### 1. 平台检测

在脚本开始时检测平台：

```bash
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    PLATFORM="windows"
elif [[ "$OSTYPE" == "darwin" ]]; then
    PLATFORM="macos"
else
    PLATFORM="linux"
fi
```

### 2. 条件执行

根据平台执行不同代码：

```javascript
if (process.platform === 'win32') {
    // Windows 代码
} else {
    // Unix/macOS 代码
}
```

### 3. 使用跨平台工具

优先使用跨平台工具：
- Node.js 脚本（使用 `path.join()`）
- Python 脚本
- Go 编译的二进制文件

### 4. 测试所有平台

确保在所有目标平台上测试：
- macOS
- Linux
- Windows

## 常见问题

### Q: 符号链接在 Windows 上失败

A: 使用 Junction 代替，或启用开发者模式。

### Q: 脚本权限问题

A: 
```bash
# Unix/macOS
chmod +x script.sh

# Windows (PowerShell)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Q: 路径问题

A: 始终使用 `path.join()` 或 `path.resolve()`，不要硬编码分隔符。

## 下一步

在下一章中，我们将探索高级主题，学习如何自定义和扩展 Superpowers。

---

**参考资源**：
- [Windows Polyglot Hooks](https://github.com/obra/superpowers/blob/main/docs/windows/polyglot-hooks.md)
- [Codex 安装指南](https://github.com/obra/superpowers/blob/main/docs/README.codex.md)
- [OpenCode 安装指南](https://github.com/obra/superpowers/blob/main/docs/README.opencode.md)
