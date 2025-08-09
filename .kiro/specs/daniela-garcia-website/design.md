# Documento de Design

## Visão Geral

O site da Daniela Garcia Advocacia será desenvolvido como uma aplicação web moderna, responsiva e otimizada para SEO. O design priorizará profissionalismo, credibilidade e facilidade de uso, seguindo as melhores práticas para sites de serviços jurídicos.

## Arquitetura

### Estrutura Técnica
- **Frontend**: HTML5, CSS3, JavaScript vanilla para máxima performance
- **Estrutura**: Single Page Application (SPA) com navegação suave
- **Responsividade**: Mobile-first design com breakpoints para tablet e desktop
- **Performance**: Otimização de imagens, minificação de CSS/JS, lazy loading

### Estrutura de Páginas
```
├── Página Inicial (Hero + Resumo dos serviços)
├── Sobre (Perfil profissional da advogada)
├── Serviços (Áreas de atuação detalhadas)
├── Contato (Formulário + informações de contato)
└── Footer (Informações adicionais + links)
```

## Componentes e Interfaces

### 1. Header/Navegação
- **Logo**: Nome "Daniela Garcia Advocacia e Assessoria Jurídica" + OAB 108061
- **Menu Principal**: Home, Sobre, Serviços, Contato
- **Menu Mobile**: Hamburger menu com animação suave
- **CTA Button**: "Falar no WhatsApp" em destaque
- **WhatsApp Flutuante**: Botão fixo no canto inferior direito

### 2. Seção Hero (Página Inicial)
- **Título Principal**: Mensagem de impacto sobre serviços jurídicos
- **Subtítulo**: Breve descrição da experiência e especialidades
- **Call-to-Action**: Botão para contato direto
- **Imagem**: Foto profissional da advogada ou imagem relacionada à justiça

### 3. Seção Sobre
- **Foto Profissional**: Retrato formal da advogada
- **Biografia**: Formação acadêmica, experiência profissional, especializações
- **Credenciais**: Destaque para OAB 108061 e outras certificações
- **Valores**: Missão, visão e valores do escritório

### 4. Seção Serviços
- **Cards de Serviços**: Grid responsivo com ícones e descrições
- **Áreas de Atuação**: 
  - Direito Civil
  - Direito Trabalhista
  - Direito de Família
  - Direito Empresarial
  - Consultoria Jurídica
- **Detalhamento**: Breve descrição de cada área

### 5. Seção Contato
- **Formulário de Contato**:
  - Nome (obrigatório)
  - Email (obrigatório)
  - Telefone (opcional)
  - Assunto (obrigatório)
  - Mensagem (obrigatório)
  - Botão de envio
- **Integração WhatsApp**:
  - Botão flutuante do WhatsApp (43 99865 3956)
  - Mensagem automática pré-definida ao iniciar conversa
  - Link direto para WhatsApp Web/App
- **Informações de Contato**:
  - Telefone/WhatsApp: (43) 99865-3956
  - Email profissional
  - Endereço do escritório
  - Horário de atendimento
- **Mapa**: Localização do escritório (se aplicável)

### 6. Footer
- **Informações Legais**: Copyright, OAB, disclaimer
- **Links Rápidos**: Navegação secundária
- **Redes Sociais**: Links para perfis profissionais (se existirem)

## Modelos de Dados

### Formulário de Contato
```javascript
{
  name: string (required, min: 2, max: 100),
  email: string (required, email format),
  phone: string (optional, phone format),
  subject: string (required, min: 5, max: 200),
  message: string (required, min: 10, max: 1000),
  timestamp: Date,
  status: 'pending' | 'sent' | 'error'
}
```

### WhatsApp Integration
```javascript
{
  phoneNumber: "5543998653956",
  defaultMessage: "Olá! Gostaria de agendar uma consulta jurídica com a Dra. Daniela Garcia.",
  businessHours: {
    start: "08:00",
    end: "18:00",
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"]
  },
  autoReply: "Obrigada pelo contato! Responderemos em breve durante nosso horário comercial."
}
```

### Configuração do Site
```javascript
{
  lawyer: {
    name: "Daniela Garcia",
    oab: "108061",
    title: "Advocacia e Assessoria Jurídica",
    email: string,
    phone: string,
    address: string,
    bio: string,
    services: Array<string>,
    photo: string
  }
}
```

## Tratamento de Erros

### Formulário de Contato
- **Validação Client-side**: Verificação em tempo real dos campos
- **Mensagens de Erro**: Feedback claro para campos inválidos
- **Estados de Loading**: Indicador visual durante envio
- **Confirmação de Sucesso**: Mensagem de confirmação após envio
- **Fallback**: Link para email direto em caso de falha

### Navegação
- **404 Handling**: Redirecionamento para página inicial
- **Carregamento**: Loading states para transições
- **Offline**: Mensagem informativa se sem conexão

## Estratégia de Testes

### Testes Funcionais
- **Formulário de Contato**: Validação de campos, envio, mensagens de erro
- **Integração WhatsApp**: Teste de links, mensagens automáticas, botão flutuante
- **Navegação**: Links funcionais, menu mobile, scroll suave
- **Responsividade**: Testes em diferentes tamanhos de tela

### Testes de Performance
- **Lighthouse**: Score mínimo de 90 para Performance, SEO e Accessibility
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Otimização de Imagens**: Formatos WebP, lazy loading

### Testes de Compatibilidade
- **Browsers**: Chrome, Firefox, Safari, Edge (últimas 2 versões)
- **Dispositivos**: Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- **Acessibilidade**: WCAG 2.1 AA compliance

## Design Visual

### Paleta de Cores
- **Primária**: Azul profissional (#1e3a8a ou similar)
- **Secundária**: Dourado elegante (#d4af37 ou similar)
- **Neutras**: Cinza escuro (#374151), Cinza claro (#f3f4f6), Branco (#ffffff)
- **Accent**: Verde para CTAs de sucesso (#10b981)

### Tipografia
- **Headings**: Fonte serif elegante (como Playfair Display ou similar)
- **Body**: Fonte sans-serif legível (como Inter ou similar)
- **Hierarquia**: H1 (32px+), H2 (24px+), H3 (20px+), Body (16px+)

### Elementos Visuais
- **Ícones**: Conjunto consistente relacionado à justiça e direito
- **Imagens**: Fotos profissionais, imagens relacionadas à justiça
- **Espaçamento**: Grid system com espaçamento consistente
- **Bordas**: Cantos levemente arredondados para modernidade

### Animações
- **Transições**: Suaves entre seções (300ms ease-in-out)
- **Hover Effects**: Estados interativos sutis
- **Scroll Animations**: Fade-in suave para elementos ao rolar
- **Loading**: Indicadores visuais durante carregamento