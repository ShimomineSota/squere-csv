import { appendFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { format } from "date-fns";
import { getCustomer } from "./getCustomer.js";
import { getOrders } from "./getOrders.js";
import { getPayment } from "./getPayments.js";

async function main() {
	const fileName = `orders_${format(new Date(), "yyyyMMddHHmmss")}.csv`;
	const filePath = join(process.cwd(), fileName);

	const header = [
		"id",
		"state",
		"amount",
		"currency",
		"created_at",
		"closed_at",
		"reference_id",
		"source_name",
		"customer_id",
		"customer_given_name",
		"customer_family_name",
		"customer_email",
		"customer_phone",
	];

	writeFileSync(filePath, `${header.join(",")}\n`, "utf8");

	const { orders } = await getOrders({});

	for (const order of orders || []) {
		let customerId: string | undefined;

		const tender = order.tenders?.[0];
		if (!tender?.paymentId) {
			continue;
		}

		const { payment } = await getPayment({ paymentId: tender.paymentId });

		if (payment?.customerId) {
			customerId = payment.customerId;
		}

		if (!customerId && order.customerId) {
			customerId = order.customerId;
		}

		if (!customerId) {
			continue;
		}

		const { customer } = await getCustomer({ customerId });

		const row = [
			order.id || "",
			order.state || "",
			order.totalMoney ? Number(order.totalMoney.amount) : 0,
			order.totalMoney ? order.totalMoney.currency || "JPY" : "JPY",
			order.createdAt || "",
			order.closedAt || "",
			order.referenceId || "",
			order.source?.name || "",
			customerId || "",
			customer?.givenName || "",
			customer?.familyName || "",
			customer?.emailAddress || "",
			customer?.phoneNumber || "",
		];

		appendFileSync(filePath, `${row.join(",")}\n`, "utf8");
	}
}

main().catch(console.error);
