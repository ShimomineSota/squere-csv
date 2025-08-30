import { SquareClient, SquareEnvironment } from "square";

const squareToken = process.env.SQUARE_ACCESS_TOKEN;
if (!squareToken) throw new Error("SQUARE_ACCESS_TOKENが設定されていません");

const client = new SquareClient({
	environment: SquareEnvironment.Production,
	token: squareToken,
});

type GetPaymentArgs = {
	paymentId: string;
};

export async function getPayment({ paymentId }: GetPaymentArgs) {
	const response = await client.payments.get({ paymentId });
	return response;
}
