import React, { useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";

const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();
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
  if (!data || isLoading) return "Loading...";
  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];
  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i],
    })
  );

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[500],
              },
              text: {
                fontSize: isDashboard ? 25 : 10,
              },
            },
            legend: {
              text: {
                fill: theme.palette.primary[500],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
                fontSize: 25,
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
              fontSize: isDashboard || !isNonMobile ? 10 : 18,
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary[500],
            },
          },
        }}
        colors={{ scheme: "category10" }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: isDashboard || !isNonMobile ? 30 : 90,
            itemWidth: 55,
            itemHeight: 18,
            itemTextColor: theme.palette.secondary[200],
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: isDashboard || !isNonMobile ? 10 : 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary.alt,
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top={!isNonMobile && !isDashboard ? "5%" : "50%"}
        left="50%"
        color={theme.palette.primary[100]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">
          {!isDashboard && "Total:"} ${data.yearlySalesTotal}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
