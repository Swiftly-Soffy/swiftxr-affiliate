import { Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

type RouteState = {
  scrollToCategory?: string;
};

type RouteItem = {
  label: string;
  path: string;
  state?: RouteState;
};

type SectionHeaderProps = {
  route?: RouteItem[];
};

function SectionHeader({ route }: SectionHeaderProps) {
  return (
    <Stack mt={3}>
      {route && (
        <Stack direction="row" spacing={2}>
          {route.map((item, index) => {
            const isLast = index === route.length - 1;

            return (
              <Stack key={index} direction="row" spacing={2}>
                {isLast ? (
                  <Typography
                    fontSize={18}
                    fontWeight={500}
                    sx={{ color: "text.primary" }}
                  >
                    {item.label}
                  </Typography>
                ) : (
                  <Link
                    to={item.path}
                    state={item.state}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography fontSize={18} color="grey.500">
                      {item.label}
                    </Typography>
                  </Link>
                )}
                {!isLast && <Typography fontSize={18} color="grey.500">/</Typography>}
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}

export default SectionHeader;
