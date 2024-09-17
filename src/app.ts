import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";

const flowBienvenida = addKeyword("hola").addAnswer("Buenas!! Bienvenido");

const main = async () => {
    const provider = createProvider(BaileysProvider);

    provider.initHttpServer(3002);

    provider.http.server.post("/send-message", async (req, res) => {  // Añadido async aquí
        const body = req.body;
        const message = body.message;
        const mediaUrl = body.mediaUrl;

        await handleCtx(bot, req, res);  // Ahora await funciona correctamente

        await bot.sendMessage(process.env.FRIEND_NUMBER, message, {
            media: mediaUrl,
        });

        res.end("esto es el server de polka");
    });

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider,
    });
};

main();