export default async (req, context) => {
  try {
    const res = await fetch(
      "https://api.football-data.org/v4/competitions/2000/matches?status=FINISHED",
      { headers: { "X-Auth-Token": "8787ad2403ad4219969d44094c6de77c" } }
    );

    const remaining = res.headers.get("X-Requests-Available-Minute");
    const data = await res.json();

    return new Response(JSON.stringify({ ...data, _remaining: remaining }), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = { path: "/api/scores" };
