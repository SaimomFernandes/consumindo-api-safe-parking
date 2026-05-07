# 🚗 Sistema de Gestão de Vagas - Condomínio

Um ecossistema completo para controle de estacionamento. Este repositório contém o **Front-end** desenvolvido em React, que consome uma **API REST** robusta feita em Spring Boot.

## 🔗 Integração Full Stack
Este projeto faz parte de uma solução completa:
*   **Back-end:** API desenvolvida em **Java + Spring Boot** (CRUD completo).
*   **Front-end:** Interface desenvolvida em **React + Vite**.

## 📋 Informações Gerenciadas
O sistema controla todos os detalhes necessários para a segurança do condomínio:
*   **Vaga:** Número da vaga.
*   **Veículo:** Placa, marca, modelo e cor.
*   **Morador:** Nome do responsável, apartamento e bloco.

## 🚀 Status das Funcionalidades
- [x] **Cadastro (Create):** Envio de dados via Axios/Fetch para a API Spring.
- [x] **Listagem (Read):** Consumo do endpoint GET para exibir as vagas.
- [ ] **Edição (Update):** Integração com o método PUT da API (Em breve).
- [ ] **Exclusão (Delete):** Integração com o método DELETE da API (Em breve).

## 🛠️ Tecnologias do Front-end
- **React.js + Vite**
- **Tailwind CSS** (Tabelas alinhadas e design limpo)
- **React Router DOM** (Navegação dinâmica)

## 📦 Como rodar
1.  Certifique-se de que o **Back-end (Spring Boot)** esteja rodando.
2.  Instale as dependências: `npm install`
3.  Inicie o projeto: `npm run dev`

---
*Nota: Para detalhes sobre a estrutura do banco de dados e endpoints, consulte o repositório do Back-end.*
