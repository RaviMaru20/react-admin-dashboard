import React, { useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useGetGeographyQuery } from "state/api";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";

const Geography = () => {
  const theme = useTheme();
  const { data } = useGetGeographyQuery();
  const isNonMobile = useMediaQuery("(min-width: 700px)");
  useEffect(() => {
    if (!isNonMobile) {
      // Get the element by class name
      const element = document.querySelector(".MuiBox-root.css-8tuymw");

      // Check if the element is found before manipulating its style
      if (element) {
        // Set the margin to 0
        element.style.margin = "0.8rem";
      }
    }
  }, [isNonMobile]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="GEOGRAPHY" subtitle="Find where your users are located." />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
        backgroundColor={theme.palette.background.alt}
      >
        {data ? (
          <ResponsiveChoropleth
            data={data}
            colors="RdYlGn"
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary[500],
                },
              },
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={isNonMobile ? 150 : 80}
            projectionTranslation={isNonMobile ? [0.45, 0.6] : [0.55, 0.7]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor="#ffffff"
            legends={[
              {
                anchor: isNonMobile ? "bottom-right" : "top-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: isNonMobile ? -125 : 15,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: isNonMobile ? 18 : 10,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.primary[50],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
