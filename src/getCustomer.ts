import { SquareClient, SquareEnvironment } from "square";

const squareToken = process.env.SQUARE_ACCESS_TOKEN;
if (!squareToken) throw new Error("SQUARE_ACCESS_TOKENが設定されていません");

const client = new SquareClient({
	environment: SquareEnvironment.Production,
	token: squareToken,
});

type GetCustomerArgs = {
	customerId: string;
};

export async function getCustomer({ customerId }: GetCustomerArgs) {
	const response = await client.customers.get({ customerId });
	return response;
}
