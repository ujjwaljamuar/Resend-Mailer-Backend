import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API);

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

app.get("/", (req, res) => {
    res.json("Backend Server is running ...");
});

app.post("/mailportfolio", async (req, res) => {
    try {
        await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["ujjwalj12222@gmail.com"],
            subject: "Contact from portfolio",
            text: `Name: ${req.body.data.name}
Email: ${req.body.data.email}
Message: ${req.body.data.message}`,
        });

        // console.log(req.body.data.name);

        res.json({
            status: "sent",
        });
    } catch (error) {
        res.send(error);
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
    console.log(`server is running successfully on PORT: ${PORT}`)
);