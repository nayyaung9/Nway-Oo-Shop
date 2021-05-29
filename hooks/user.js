import useSWR from "swr";
import fetcher from "@/lib/fetch";

export function useCurrentUser() {
  const { data, mutate } = useSWR("/api/currentUser", fetcher);
  const user = data?.user;
  return [user, { mutate }];
}

export function useUser(id) {
  const { data } = useSWR(`/api/users/${id}`, fetcher, {
    revalidateOnFocus: false,
  });
  return data?.user;
}
