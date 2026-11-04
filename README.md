# TaskFlow — Gerenciador de Tarefas Kanban

Projeto acadêmico de **Prática Profissional em Análise e Desenvolvimento de Sistemas**, desenvolvido para organizar atividades em quadros Kanban e acompanhar o andamento de tarefas e subtarefas.

**Repositório:** https://github.com/AlexandreCalanca/TaskFlow

## 1. Sobre o projeto

O TaskFlow organiza o trabalho em quatro elementos:

- **Quadros:** espaços para projetos ou conjuntos de atividades.
- **Colunas:** etapas do fluxo de trabalho, criadas inicialmente como **A Fazer**, **Em Progresso** e **Concluído**.
- **Tarefas:** atividades com título, descrição e posição no quadro.
- **Subtarefas:** etapas menores que podem ser marcadas como concluídas ou reabertas.

A interface permite navegar entre quadros, visualizar tarefas, alternar o tema visual e movimentar tarefas entre colunas. Os dados dos quadros e tarefas são fornecidos por uma API Java e armazenados no PostgreSQL.

> **Estado do projeto:** algumas ações presentes no protótipo visual, como edição de quadros/tarefas e personalização de colunas, ainda não têm implementação completa no back-end. A tela de login é visual; **não há autenticação real de usuários** nesta versão.

## 2. Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Front-end | React, Vite, Tailwind CSS, Lucide React |
| Back-end | Java 21, Spring Boot, Spring Web MVC, Spring Data JPA / Hibernate |
| Banco de dados | PostgreSQL |
| Construção e versionamento | Maven Wrapper, npm, Git e GitHub |

## 3. Estrutura do repositório

```text
TaskFlow/
├── kanban-backend/       # API REST em Java / Spring Boot
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
├── kanban-frontend/      # Interface React / Vite
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── PlanoTestesCenario/    # Artefatos de testes do projeto
└── README.md
```

## 4. Pré-requisitos

Instale as ferramentas abaixo antes de executar o sistema:

- **Git** para baixar o repositório.
- **JDK 21** para executar o back-end (`java -version`).
- **Node.js** e **npm** para executar o front-end (`node -v` e `npm -v`).
- **PostgreSQL** em execução na porta padrão `5432` (testado com PostgreSQL 17).

Não é necessário instalar o Maven globalmente: o projeto inclui **Maven Wrapper** (`mvnw` / `mvnw.cmd`). A IDE é opcional; VS Code e IntelliJ IDEA podem ser utilizados.

## 5. Baixar o projeto

Abra um terminal e execute:

```bash
git clone https://github.com/AlexandreCalanca/TaskFlow.git
cd TaskFlow
```

## 6. Configurar o PostgreSQL

1. Inicie o serviço PostgreSQL.
2. Conecte-se com um usuário com permissão para criar bancos de dados. Por exemplo:

```bash
psql -U postgres -h localhost -p 5432
```

3. No console `psql`, crie o banco (caso ele ainda não exista):

```sql
CREATE DATABASE kanbandb;
```

4. Confirme a conexão:

```text
\c kanbandb
```

5. Para sair do console:

```text
\q
```

O banco local **`kanbandb`** é o nome padrão configurado para o back-end. O Hibernate está configurado com `ddl-auto: update`, de modo que pode criar/atualizar tabelas a partir das entidades quando o sistema inicia. **Isso não importa os dados de outro computador:** para migrar dados existentes, é necessário backup e restauração do PostgreSQL.

### Configurações do back-end

O arquivo de configuração é:

```text
kanban-backend/src/main/resources/application.yaml
```

Por padrão, a aplicação utiliza:

```yaml
spring:
  datasource:
    url: ${SPRING_DATASOURCE_URL:jdbc:postgresql://localhost:5432/kanbandb}
    username: ${SPRING_DATASOURCE_USERNAME:postgres}
    password: ${SPRING_DATASOURCE_PASSWORD:postgres}
```

**Segurança:** o valor `postgres` acima é apenas o padrão herdado do projeto para desenvolvimento local. Configure uma senha própria no PostgreSQL e forneça-a por variável de ambiente; **não publique senhas reais no GitHub**.

No **PowerShell**, antes de iniciar o Spring Boot:

```powershell
$env:SPRING_DATASOURCE_PASSWORD = Read-Host "Senha do PostgreSQL"
```

No **macOS/Linux (bash/zsh)**:

```bash
read -s -p "Senha do PostgreSQL: " SPRING_DATASOURCE_PASSWORD
export SPRING_DATASOURCE_PASSWORD
echo
```

Se você utilizar outro nome de banco, porta ou usuário, configure também `SPRING_DATASOURCE_URL` e `SPRING_DATASOURCE_USERNAME`.

## 7. Executar o back-end

Abra um terminal na pasta `TaskFlow/kanban-backend`.

**Windows (PowerShell):**

```powershell
cd kanban-backend
.\mvnw.cmd spring-boot:run
```

**macOS/Linux:**

```bash
cd kanban-backend
./mvnw spring-boot:run
```

O back-end deve iniciar na porta **8080**. Mantenha esse terminal aberto.

Para verificar a API, abra outro terminal e acesse:

```text
http://localhost:8080/api/boards
```

Ou execute:

```bash
curl http://localhost:8080/api/boards
```

Uma resposta `[]` significa que a lista de quadros está vazia; uma lista JSON com quadros indica que já há registros cadastrados.

## 8. Executar o front-end

Abra **outro terminal**, volte à pasta raiz `TaskFlow` e entre em `kanban-frontend`:

```bash
cd kanban-frontend
```

Instale as dependências:

**Windows (PowerShell):**

```powershell
npm.cmd install
npm.cmd run dev
```

**macOS/Linux:**

```bash
npm install
npm run dev
```

O Vite exibirá a URL local da aplicação, normalmente:

```text
http://127.0.0.1:5173/
```

Acesse o endereço exibido no terminal. Para usar os recursos de quadros e tarefas, mantenha o Spring Boot e o PostgreSQL em execução.

> No PowerShell, `npm.cmd` evita o bloqueio do script `npm.ps1` que pode ocorrer conforme a política local de execução.

### Configuração opcional da URL da API

O front-end lê a variável `VITE_API_URL`, usando `http://localhost:8080/api` como endereço padrão. Se a API estiver em outro endereço, crie um arquivo `kanban-frontend/.env.local` com:

```dotenv
VITE_API_URL=http://localhost:8080/api
```

Altere apenas se necessário e reinicie o Vite. Não inclua segredos em variáveis `VITE_`, pois elas são incorporadas ao código enviado ao navegador.

## 9. Funcionalidades disponíveis e limitações

**Com suporte na API atual:**

- Listar e consultar quadros (`GET /api/boards` e `GET /api/boards/{id}`).
- Criar quadros (`POST /api/boards`), com três colunas iniciais.
- Excluir quadros (`DELETE /api/boards/{id}`).
- Criar tarefas com subtarefas (`POST /api/tasks`).
- Movimentar tarefas (`PATCH /api/tasks/{id}/move`).
- Excluir tarefas (`DELETE /api/tasks/{id}`).
- Concluir ou reabrir subtarefas (`PATCH /api/tasks/subtasks/{id}/toggle`).

**Na interface React:** navegação entre quadros, visualização dos cards, tema claro/escuro, modais e tela visual de login.

**Limitações conhecidas:** a autenticação do login ainda não está integrada ao back-end. A edição de quadros/tarefas e a criação/edição/exclusão de colunas não possuem endpoints completos nesta versão. A tela de login não deve ser tratada como um controle de acesso funcional.

## 10. Problemas comuns

| Situação | Verificação sugerida |
| --- | --- |
| `psql` não reconhecido | Verifique a instalação do PostgreSQL e o `PATH` da pasta `bin`. |
| Erro de conexão com PostgreSQL | Confirme serviço, porta `5432`, banco `kanbandb`, usuário e senha. |
| `mvn` não reconhecido | Use `mvnw.cmd` (Windows) ou `./mvnw` (macOS/Linux). |
| `vite` não reconhecido | Execute `npm install` ou `npm.cmd install` dentro de `kanban-frontend`. |
| `npm.ps1` bloqueado no PowerShell | Execute `npm.cmd` no lugar de `npm`. |
| Front-end carrega, mas não mostra quadros | Confirme se a API está ativa em `http://localhost:8080/api/boards` e se existem registros. |
| A API responde `[]` | O banco está acessível, mas nenhum quadro foi retornado. |

## 11. Testes e construção

Na pasta `kanban-backend`, execute os testes automatizados existentes:

**Windows:**

```powershell
.\mvnw.cmd test
```

**macOS/Linux:**

```bash
./mvnw test
```

Na pasta `kanban-frontend`, gere os arquivos de produção:

```bash
npm run build
```

No PowerShell, utilize `npm.cmd run build` se necessário. A pasta `dist/` é a saída de build do front-end, não um substituto para a API Java ou o banco de dados.

## 12. Controle de versões e documentação

O projeto utiliza Git e GitHub. Na atividade de controle de versões da disciplina, são utilizadas:

- **Tag `v1`:** identificação da entrega da primeira iteração.
- **Branch `iteracao2`:** alterações realizadas separadamente da branch principal.
- **Merge:** integração das alterações da `iteracao2` à branch `main`.
- **Tag `v2`:** identificação da entrega da segunda iteração.

Essas referências devem ser verificadas na aba **Branches/Tags** do repositório. O guia do usuário e o documento de especificação são artefatos complementares a este README: este arquivo é destinado principalmente a desenvolvedores que precisam instalar e executar a aplicação.

## 13. Escopo acadêmico

Projeto desenvolvido para fins de aprendizagem e prática de desenvolvimento full-stack, integração de aplicações, persistência de dados, documentação e controle de versões.

