# Plano de produto e implementação — LingShip

> Documento de contexto para produto, desenvolvimento e agentes. Atualizado em 14 de novembro de 2026.

## Visão

A LingShip deve conectar a aula particular ao estudo entre os encontros. Não é apenas uma área de cursos: cada aluno tem um espaço privado com aulas, materiais, atividades, evolução e revisões sugeridas.

O painel da professora é o centro de operação. O painel do aluno é seu espaço individual.

## Decisões atuais

| Tema | Decisão |
| --- | --- |
| Público inicial | 10–20 alunos |
| Aplicação | Next.js 16, React 19, TypeScript e Tailwind CSS 4 |
| Backend inicial | O próprio Next.js: Server Actions para alterações e Route Handlers para integrações/webhooks |
| Dados, login e arquivos | Supabase: Auth, PostgreSQL, Storage e regras RLS |
| Hospedagem | Vercel |
| Processos demorados | Fila/worker Node somente quando gravações, transcrições e IA forem ativadas |
| Repositório | Esta pasta é o repositório próprio da plataforma. Não entra no Git do Lume Central. |

Não criar um backend Node independente no MVP. Next.js já fornece execução no servidor. Criar um worker Node separado somente para processamento assíncrono que possa exceder o tempo de uma requisição: baixar gravação, extrair áudio, transcrever, resumir e criar sugestões de flashcards.

## Perfis e acesso

| Perfil | Pode fazer |
| --- | --- |
| Aluno | Ver somente suas aulas, gravações, materiais, tarefas, revisões, cursos adquiridos e progresso. |
| Professora/administradora | Gerir alunos, aulas, materiais, cursos, conteúdos, revisões e publicar informações para cada aluno. |

Toda tabela com dados de alunos deve aplicar RLS no banco. Nunca confiar apenas em esconder botões na interface.

## Funcionalidades

### Núcleo do aluno

- Meu espaço: visão da próxima aula, pendências, materiais recentes e revisão do dia.
- Aulas: data, objetivo, anotações, atividades e materiais associados.
- Materiais personalizados: livros, textos, exercícios, links e arquivos com organização e busca.
- Meu percurso: produções, atividades, marcos e registro de evolução.
- Cursos e conteúdos: módulos, aulas, progresso e acesso conforme matrícula/compra.

### Operação da professora

- Cadastro e acompanhamento de alunos.
- Registro e publicação de aulas e materiais por aluno.
- Editor e publicação de cursos, séries de conversas e conteúdos.
- Visão de revisões pendentes e evolução de cada aluno.

### Evolução com gravação e IA

- Gravações organizadas por data e aula, acessíveis apenas ao aluno e à professora.
- Transcrição da aula.
- Resumo assistido por IA: assuntos, dificuldades, vocabulário/expressões, tarefas e sugestões de revisão.
- Revisão humana da professora antes da publicação para o aluno.
- Flashcards sugeridos a partir da aula e aprovados antes de entrarem na rotina do aluno.

### Revisão espaçada

- Flashcards de vocabulário, expressões e estruturas.
- Agenda de revisão, resposta do aluno e histórico de acertos.
- Algoritmo simples no MVP; só evoluir para uma lógica semelhante ao Anki após uso real.

## Fora do MVP

- Pagamento recorrente e checkout integrado.
- Comunidade, chat em tempo real e gamificação.
- Aplicativo nativo.
- Geração automática e publicação sem revisão humana.
- Sistema complexo de agenda. No início, registrar aulas e enviar lembretes é suficiente.

## Backlog de desenvolvimento

As etapas abaixo têm ordem de produto: primeiro deixar a experiência e as regras da plataforma prontas com dados locais estruturados; depois conectar as contas, banco e produção. Cada item marcado é uma tarefa fechada, não apenas uma ideia.

### 1. Base do produto e limpeza do protótipo

- [ ] Mapear cada rota atual e registrar se é aluno, professora, marketing ou demonstração.
- [ ] Remover o seletor de demonstração da versão destinada a usuários reais, preservando-o apenas se for útil em ambiente de apresentação.
- [ ] Trocar textos ilustrativos por estados explícitos de rascunho onde o conteúdo pedagógico ainda não foi fornecido pela Vanessa.
- [ ] Criar uma camada de dados local (`mocks`/repositórios) sem dados espalhados dentro dos componentes.
- [ ] Definir tipos únicos para aluno, aula, material, curso, atividade, flashcard e progresso.
- [ ] Garantir que `npm run lint`, `npm run typecheck` e `npm run build` passem ao final da etapa.

**Pronto quando:** cada tela usa a camada de dados, não há informação fictícia escondida em componentes e as rotas têm responsáveis claros.

### 2. Painel do aluno — Meu espaço e percurso

- [ ] Definir o conteúdo da página inicial: próxima aula, tarefa prioritária, material recente e revisão do dia.
- [ ] Implementar estado vazio para aluno sem aula, material, curso ou revisão.
- [ ] Implementar lista de aulas com data, objetivo, anotações, tarefas e materiais ligados.
- [ ] Implementar Meu percurso com marcos, atividades e produções escritas.
- [ ] Implementar página de material com tipo, origem, data, arquivo/link e vínculo com uma aula.
- [ ] Adicionar busca e filtros por tipo de material, curso e período.
- [ ] Validar navegação no celular nas rotas principais do aluno.

**Pronto quando:** um aluno consegue entender o que fazer hoje e reencontrar uma aula ou material antigo sem ajuda.

### 3. Painel da professora — operação individual

- [ ] Definir listagem de alunos com nome, status, próxima aula, pendência e último contato pedagógico.
- [ ] Implementar visão individual do aluno com aulas, materiais, tarefas, produções e percurso.
- [ ] Implementar formulário de criação/edição de aula: data, objetivo, observações, tarefa e materiais.
- [ ] Implementar criação e publicação de material para um aluno específico.
- [ ] Implementar rascunho/publicado para notas e materiais que ainda serão revisados.
- [ ] Definir ações de editar, arquivar e remover com confirmação visual.

**Pronto quando:** a professora consegue simular o ciclo “registrar aula → adicionar material/tarefa → aluno visualiza” usando os dados locais.

### 4. Cursos e conteúdos independentes

- [ ] Revisar o modelo de curso atual: curso, módulo, aula, série de conversas e conteúdo avulso.
- [ ] Implementar acesso, progresso por aula e continuidade de onde o aluno parou.
- [ ] Implementar estados: não matriculado, em andamento e concluído.
- [ ] Implementar editor da professora para criar, editar, ordenar e publicar curso/módulo/aula.
- [ ] Separar conteúdos de cursos dos materiais privados de aula particular.

**Pronto quando:** um curso pode ser montado pela professora, liberado a um aluno e acompanhado nos dois painéis.

### 5. Revisão espaçada

- [ ] Definir estrutura de flashcard: frente, verso, categoria, origem, aluno e status.
- [ ] Criar tela de revisão com resposta, autoavaliação e avanço para o próximo cartão.
- [ ] Implementar agendamento inicial simples: novo, amanhã, 3 dias, 7 dias e revisar depois.
- [ ] Mostrar a revisão do dia no Meu espaço.
- [ ] Permitir que a professora crie, edite, pause e atribua flashcards.
- [ ] Registrar tentativas e resultados para que o progresso exista antes de otimizar o algoritmo.

**Pronto quando:** um flashcard criado pela professora aparece na revisão do aluno e a resposta altera sua próxima data de revisão.

### 6. Gravações do Google Meet e IA

- [ ] Confirmar que a conta Google usada nas aulas tem permissão de gravação e que a Vanessa será a organizadora dos eventos.
- [ ] Definir a convenção de calendário e nomes de aula para localizar gravações no Drive.
- [ ] Criar a entidade de gravação: aula vinculada, link/identificador no Drive, data, status e acesso.
- [ ] Exibir a gravação no espaço correto do aluno sem abrir acesso a outras gravações.
- [ ] Definir o fluxo de transcrição: arquivo pronto → fila → transcrição → rascunho de resumo.
- [ ] Criar revisão da professora para resumo, tarefas, dificuldades e sugestões de flashcard.
- [ ] Publicar somente o que a professora aprovou; manter opção de apagar a gravação, transcrição e resumo.

**Pronto quando:** uma aula do Meet pode aparecer no histórico do aluno com acesso correto e, mais tarde, ter um resumo aprovado pela professora.

### 7. Infraestrutura, contas e dados reais

- [x] Atualizar o `.gitignore` do Lume Central para ignorar `clientes/LingShip/entregaveis/plataforma/`.
- [ ] Criar organizações de produção da LingShip no Vercel e Supabase; adicionar a Vanessa como proprietária e o desenvolvimento como administrador técnico.
- [ ] Criar projeto Supabase, variáveis de ambiente e banco PostgreSQL.
- [ ] Criar tabelas, migrações, índices e políticas RLS a partir do modelo de dados abaixo.
- [ ] Integrar login real e proteção de rotas para `student` e `teacher`.
- [ ] Trocar um módulo por vez da camada local para o banco, sem reescrever as telas.
- [ ] Configurar Storage privado para PDFs e materiais; vídeo inicialmente continua no Drive.
- [ ] Publicar na Vercel, configurar domínio, e-mail de envio e ambientes de preview/produção.
- [ ] Configurar backups, monitoramento de erros, limite de gastos e processo de atualização.

**Pronto quando:** dois alunos de teste têm login, veem somente seus dados e a professora consegue operar dados reais em produção.

### 8. Privacidade, piloto e lançamento

- [ ] Publicar aviso de privacidade em linguagem simples.
- [ ] Solicitar consentimento antes de iniciar a gravação e registrar a aceitação na plataforma.
- [ ] Aplicar a regra inicial de retenção: gravações, transcrições e resumos ficam durante o vínculo do aluno e por 12 meses depois; após isso, são apagados salvo acordo diferente.
- [ ] Criar fluxo para exclusão solicitada pelo aluno.
- [ ] Testar permissões com contas de alunos diferentes e conta de professora.
- [ ] Fazer piloto com 2–3 alunos; registrar problemas e feedback.
- [ ] Abrir para a base atual depois do piloto e revisar custos mensais.

**Pronto quando:** a plataforma tem dados reais, regras de acesso testadas, consentimento registrado e um piloto concluído.

## Modelo de dados inicial

| Grupo | Tabelas/entidades |
| --- | --- |
| Identidade | `profiles`, `roles`, `student_profiles` |
| Ensino individual | `sessions`, `session_notes`, `materials`, `assignments`, `submissions`, `learning_milestones` |
| Cursos | `courses`, `modules`, `lessons`, `enrollments`, `lesson_progress` |
| Revisão | `flashcards`, `review_schedule`, `review_attempts` |
| Gravação e IA | `recordings`, `transcripts`, `transcript_segments`, `ai_summaries`, `ai_suggestions` |
| Operação | `notifications`, `audit_events`, `consents` |

Arquivos e vídeos ficam em Storage privado. O banco guarda nome, tipo, proprietário, vínculo com aula/curso e caminho do arquivo. O acesso deve ocorrer por URL assinada e temporária.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| Next.js 16 + React 19 + TypeScript | Aplicação, rotas, renderização e código do servidor |
| Tailwind CSS 4 | Interface existente |
| Supabase | PostgreSQL, Auth, Storage, RLS e backups conforme plano |
| Vercel | Deploy e execução da aplicação Next.js |
| Node.js worker (posterior) | Processamentos assíncronos de vídeo, áudio e IA |
| OpenAI API (posterior) | Transcrição e resumo assistido por IA |

## Custos de referência

Valores em USD, consultados em 14 de novembro de 2026. Confirmar no momento de contratar.

| Serviço | Início sugerido | Referência de custo |
| --- | --- | --- |
| Vercel | Pro para uso comercial | US$ 20/mês por assento, com créditos de uso incluídos. Hobby é gratuito, mas destinado a uso pessoal e não comercial. |
| Supabase | Free durante desenvolvimento; Pro no lançamento | Free: US$ 0, com 500 MB de banco e 1 GB de Storage. Pro: a partir de US$ 25/mês, com 8 GB de banco, 100 GB de Storage e backups diários. |
| OpenAI — transcrição | Somente na etapa de gravações | `gpt-transcribe`: US$ 0,0045 por minuto. Ex.: 20 aulas de 60 min = cerca de US$ 5,40/mês somente de transcrição. |
| IA para resumo/flashcards | Somente na etapa de gravações | Variável conforme modelo e tamanho da transcrição; definir limite mensal e registrar consumo. |
| Vídeo/conferência | Google Meet | Custo depende do plano Google Workspace usado pela LingShip. Confirmar se a conta atual permite gravação. |
| Domínio | A decidir | Custo anual varia pela extensão e registrador. |

Fontes: [Vercel Pricing](https://vercel.com/pricing), [Supabase Pricing](https://supabase.com/pricing), [OpenAI API Pricing](https://developers.openai.com/api/docs/pricing?latest-pricing-expanded=true).

## Regras de privacidade e qualidade

- Obter consentimento explícito antes de gravar ou transcrever uma aula.
- Mostrar quem pode acessar cada gravação e permitir remoção mediante pedido.
- Definir prazo de retenção para vídeo, áudio e transcrição.
- Nunca expor chaves de serviço no navegador nem no Git.
- Resultados de IA são rascunhos e exigem revisão da professora antes de orientar o aluno.
- Registrar alterações relevantes e acessos administrativos em `audit_events`.

## Próxima decisão necessária

O Google Meet é a ferramenta definida para as aulas. Falta confirmar o plano Google Workspace, quem inicia a gravação e onde o arquivo fica disponível no Drive. Essa definição detalha a integração da Etapa 4; as Etapas 1 a 3 independem dela.
