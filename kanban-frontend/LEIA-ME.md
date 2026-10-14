# TaskFlow Front-end restaurado

Interface restaurada a partir do **React original enviado**, com Tailwind CSS 4 e Lucide.

## Executar no Windows

1. Mantenha o Spring Boot em execução em `http://localhost:8080`.
2. No PowerShell, entre nesta pasta e execute `npm.cmd install` e `npm.cmd run dev`.
3. Abra a URL impressa pelo Vite.

A aplicação carrega **dados reais** de `/api/boards`; sem quadro cadastrado, a tela inicialmente aparecerá vazia. Use a sidebar e clique em **Criar Novo Quadro**.

## Integração

Persistidos na API existente: listar/criar/excluir quadros; criar/excluir/mover tarefas; alternar subtarefas.

**Limites reais do back-end fornecido:** não existem rotas para editar quadros, editar tarefas ou adicionar/editar colunas. A interface visual desses fluxos foi preservada onde possível, mas ações não suportadas exibem aviso em vez de fingir salvar alterações. Novos quadros usam três colunas padrão do servidor.

Nenhum arquivo do back-end é alterado. Se desejar todas as funções do protótipo original, será necessário ampliar os endpoints do Spring Boot.

## Segurança do Git

Mantenha a branch `feature/restaurar-layout-kanban` e faça backup da pasta antiga antes de substituir o front-end.
