---
layout : markdown
title : Project RAG
tags : [Project, RAG]
toc : true
---

{% include markdown.html %}

- 학습 사이트: [nextjs 공식 페이지](https://nextjs.org/docs){:target="_blank"}
<details>
    <summary><h2>2025-12-18</h2></summary>
    <div class="post-content">
        <ul class="content-list">
            <li>
                <article class="content-card">
                    <header class="card-header">
                        <h3 class="card-title">프로젝트 기획 및 설치</h3>
                    </header>
                    
                    <h4>프로젝트 기획</h4>
                    <ul class="info-list">
                        <li><strong>프론트엔드:</strong> Next.js</li>
                        <li><strong>백엔드:</strong> FastAPI</li>
                        <li><strong>데이터베이스:</strong> Supabase</li>
                    </ul>

                    <h4>설치 과정</h4>
                    <ol>
                        <li>
                            <strong>
                                패키지 관리자 설치
                            </strong>
                            <pre><code class="language-powershell">npm install -g pnpm</code></pre>
                        </li>
                        <li>
                            <strong>
                                Next.js 프로젝트 생성
                            </strong>
                            <p>!!!(주의) 빈 디렉터리에서 실행하세요.</p>
                            <pre><code class="language-powershell">pnpm create next-app@latest .</code></pre>
                        </li>
                        <li>
                            <strong>
                                exFAT 드라이브 오류 해결
                            </strong>
                            <p>원인: 작업 환경이 exFAT 드라이브일 때 발생합니다.</p>
                            <p>오류 메시지:</p>
                                <pre><code>The "D:" drive is exFAT, which does not support symlinks. This will cause installation to fail. You can set the node-linker to "hoisted" to avoid this issue.</code></pre>
                            <p>해결 방법:</p>
                            <ul>
                                <li>프로젝트 루트에 <code>.npmrc</code> 파일을 생성합니다:
                                    <pre><code>node-linker=hoisted</code></pre>
                                </li>
                                <li>패키지를 설치합니다:
                                    <pre><code class="language-powershell">pnpm install</code></pre>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>
                                개발 서버 실행
                            </strong>
                            <pre><code class="language-powershell">pnpm dev</code></pre>
                        </li>
                    </ol>                    
                </article>
            </li>
        </ul>
    </div>
</details>