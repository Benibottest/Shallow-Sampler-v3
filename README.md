# FreeVideo Studio 0.1

Protótipo mobile-first da interface de um gerador de vídeos por IA.

## Como testar no Android
1. Extraia o ZIP.
2. Abra `frontend/index.html` em um navegador ou editor com pré-visualização HTML.
3. Teste os modos Texto → Vídeo e Imagem → Vídeo.

## O que funciona
- Interface responsiva para celular.
- Alternância entre texto e imagem.
- Pré-visualização e validação de upload (PNG/JPG/WEBP até 10 MB).
- Seleção de duração e resolução.
- Criação local de cartões de projeto.

## O que ainda não funciona
- Geração real de vídeo.
- Backend, fila remota e armazenamento na nuvem.
- Download de MP4.

## Próxima etapa
Criar o backend FastAPI e conectar um motor de geração executado em uma GPU remota gratuita quando disponível.

O projeto não exige API paga, mas a disponibilidade de GPU gratuita não é garantida.
