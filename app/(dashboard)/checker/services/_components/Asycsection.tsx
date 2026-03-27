// components/AsyncSections.tsx
// These are async SERVER components — they fetch data on the server
// and are wrapped in <Suspense> in the page.

import { BookingsList } from "./booking-list";
import { getCheckerBookings, getCheckerServices } from "./server-actions";
import { ServicesList } from "./services-list";
import { BookingFilter } from "./types-services";



// ── Services async section ────────────────────────────────────────────────

interface AsyncServicesProps {
  checkerId: string;
}

export async function AsyncServices({ checkerId }: AsyncServicesProps) {
  const services = await getCheckerServices(checkerId);
  return <ServicesList services={services} checkerId={checkerId}/>;
}

// ── Bookings async section ────────────────────────────────────────────────

interface AsyncBookingsProps {
  checkerId: string;
  filter: BookingFilter;
}

export async function AsyncBookings({ checkerId, filter }: AsyncBookingsProps) {
  const bookings = await getCheckerBookings(checkerId, filter);
  return <BookingsList bookings={bookings} activeFilter={filter} />;
}