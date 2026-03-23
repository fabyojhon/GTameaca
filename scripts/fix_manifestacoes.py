import re

def update_manifestacoes():
    filepath = 'e:/GTameaça/Manifestações/Manifestações.html'
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_css = """        body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            margin: 0;
            display: flex;
            height: 100vh;
            overflow: hidden;
        }

        /* Sidebar Styles */
        .sidebar {
            width: 80px;
            background-color: #f1f5f9;
            border-right: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 2rem;
            position: relative;
        }

        .sidebar-logo {
            width: 48px;
            height: 48px;
            background-color: #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .sidebar-logo svg {
            width: 24px;
            height: 24px;
            color: #3b82f6;
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: #64748b;
            padding: 1rem 0;
            width: 100%;
            margin-bottom: 0.5rem;
            transition: all 0.2s;
        }

        .nav-item.active {
            background-color: #3b82f6;
            color: #ffffff;
            border-radius: 8px;
            width: 85%;
        }

        .nav-item svg {
            width: 24px;
            height: 24px;
            margin-bottom: 0.25rem;
        }

        .nav-item span {
            font-size: 0.65rem;
            text-align: center;
            font-weight: 500;
        }

        .sidebar-bottom {
            position: absolute;
            bottom: 1rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }

        .sidebar-bottom .nav-item {
            margin-bottom: 0;
            padding: 0.5rem 0;
        }

        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }"""

    new_html = """<body>

    <!-- SIDEBAR -->
    <aside class="sidebar">
        <div style="margin-bottom: 2rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#3b82f6" stroke-width="3" />
                <circle cx="12" cy="12" r="4" fill="#f43f5e" />
            </svg>
        </div>

        <a href="../index.html" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Página Inicial</span>
        </a>

        <a href="../index.html" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>Atendimentos</span>
        </a>

        <a href="../identificacao.html" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Registrar<br>atendimento</span>
        </a>

        <a href="Manifestações.html" class="nav-item active">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span>Manifestações</span>
        </a>

        <div class="sidebar-bottom">
            <a href="#" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Setup</span>
            </a>
            <a href="#" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>F0000001</span>
            </a>
        </div>
    </aside>

    <main class="main-content">
    <div class="header">
        <button class="btn-voltar" onclick="window.location.href='../identificacao.html'">◀ Voltar para Atendimento</button>"""

    # 1. Replace CSS
    css_pattern = re.compile(r'        body \{[^}]+\}', re.MULTILINE | re.DOTALL)
    if 'display: flex' not in content:
        content = css_pattern.sub(new_css, content, count=1)
        print("CSS applied.")
    
    # 2. Replace HTML Body start
    html_pattern = re.compile(r'<body>\s*<div class="header">\s*<button class="btn-voltar">◀ Voltar</button>', re.MULTILINE | re.DOTALL)
    if '<aside class="sidebar">' not in content:
        content = html_pattern.sub(new_html, content, count=1)
        print("HTML Sidebar applied.")

    # 3. Replace HTML Body end
    end_pattern = re.compile(r'    </script>\s*</body>', re.MULTILINE | re.DOTALL)
    if '</main>' not in content:
        content = end_pattern.sub('    </script>\n    </main>\n</body>', content, count=1)
        print("HTML main close applied.")
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Done writing modifications")

if __name__ == '__main__':
    update_manifestacoes()
