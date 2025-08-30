import { endOfDay, formatISO, parseISO, startOfDay, subMonths } from "date-fns";
import { type Square, SquareClient, SquareEnvironment } from "square";

const squareToken = process.env.SQUARE_ACCESS_TOKEN;
if (!squareToken) throw new Error("SQUARE_ACCESS_TOKENが設定されていません");

const client = new SquareClient({
	environment: SquareEnvironment.Production,
	token: squareToken,
});

type GetOrdersArgs = {
	states?: Square.OrderState[];
	to?: string;
	from?: string;
};

export async function getOrders({ states, from, to }: GetOrdersArgs) {
	const locationId = process.env.SQUARE_LOCATION_ID;
	if (!locationId) throw new Error("SQUARE_LOCATION_IDが設定されていません");

	const fromDate = from
		? formatISO(startOfDay(parseISO(from)))
		: formatISO(startOfDay(subMonths(new Date(), 1)));

	const toDate = to ? formatISO(endOfDay(parseISO(to))) : undefined;

	const dateTimeFilter: {
		createdAt: {
			startAt: string;
			endAt?: string;
		};
	} = {
		createdAt: {
			startAt: fromDate,
		},
	};

	if (toDate) {
		dateTimeFilter.createdAt.endAt = toDate;
	}

	const response = await client.orders.search({
		locationIds: [locationId],
		query: {
			filter: {
				stateFilter: {
					states: states ?? ["OPEN"],
				},
				dateTimeFilter,
			},
		},
	});

	return response;
}
