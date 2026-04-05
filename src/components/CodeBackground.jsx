import { useEffect, useRef } from "react"
import "../styles/CodeBackground.css"

const snippets = [
  // — React / Hooks
  "const", "import", "export", "return",
  "useState", "useEffect", "useRef", "useContext",
  "useMemo", "useCallback", "useReducer",
  "function", "=>", "props", "children",

  // — JSX / HTML
  "<div>", "</>", "<span>", "<section>",
  "<h1>", "<ul>", "<li>", "<img />",
  "<input />", "<button>", "<a href>",
  "className", "onClick", "onChange", "onSubmit",

  // — JavaScript
  ".map()", ".filter()", ".reduce()", ".find()",
  ".forEach()", ".includes()", ".slice()",
  "async", "await", "fetch", "Promise",
  "try", "catch", "throw", "finally",
  "===", "!==", "??", "?.", "...",
  "true", "null", "undefined", "typeof",
  "{ }", "[ ]", "( )",

  // — TypeScript
  "interface", "type", "string", "number",
  "boolean", "void", "never", "any",
  "extends", "keyof", "Partial<T>",

  // — CSS / Tailwind
  "flex", "grid", "z-index", "gap",
  "absolute", "relative", "overflow",
  "@media", ":hover", "px-4", "mt-2",

  // — Terminal / Git
  "npm", "git", "git commit", "git push",
  "npm run dev", "npm install",
  "node_modules", "package.json",

  // — Outros
  "JSON.parse()", "localStorage",
  "console.log()", "debugger",
  "404", "200 OK", "HTTP", "REST",
  "API", ".env", "deploy", "vercel",
]

const colors = [
  "#009c22", // verde
  "#00b5ec", // roxo
  "#e3f300", // azul
  "#ff00bf", // laranja
]

export default function CodeBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    const items = []

    const spawn = () => {
      const el = document.createElement("span")
      el.className = "code-word"
      el.textContent = snippets[
        Math.floor(Math.random() * snippets.length)
      ]

      const duration = Math.random() * 8 + 9  // 6s–14s
      const color = colors[
        Math.floor(Math.random() * colors.length)
      ]

      el.style.left     = Math.random() * 100 + "%"
      el.style.bottom   = "-2rem"
      el.style.color    = color
      el.style.fontSize = Math.random() * 5 + 10 + "px"
      el.style.animationDuration = duration + "s"
      el.style.animationDelay   = Math.random() * 4 + "s"

      container.appendChild(el)
      items.push(el)

      // remove após a animação terminar
      setTimeout(() => el.remove(),
        (duration + 4) * 1000)
    }

    // cria 1 palavra a cada 600ms
    const interval = setInterval(spawn, 200)
    return () => clearInterval(interval)
  }, [])

  return <div className="code-bg" ref={ref} />
}