# Abstrack

## Purpose of the paper:
Since long, KANBAN is used in industry as an effective and efficient approach of supplying material as needed to the shop floor. In its traditional form, the parameters for KANBAN, that is for each material the number of boxes and the quantity per box, are static, i.e. calculated initially and, if at all, re-calculated only if someone suspects the parameters to be sub-optimal. This paper shows how a traditional KANBAN system can be converted into a self-adaptive KANBAN, where the parameters are dynamically adjusted to reflect the dynamics of the environment, such as availability and utilization of transport capacity for the boxes as well as picking capacity in the warehouse. The self-adaptive approach aims at setting KANBAN parameters in a way that shop-floor inventory is at a viable minimum.

## Design/methodology/approach: 
Using a simulation of the process of supplying material, we suggest an optimization method based on Evolution Strategies (ES) to dynamically adjust (self-adapt) KANBAN parameters. The ES method is applied to a simulation system to search for and analyze optimal KANBAN parameters.  

## Findings: 
Compared to the traditional KANBAN approach, self-adaptive KANBAN is more flexible and efficient in unstable production environments, in which key variables are volatile, e.g. demand because of changes in the model mix or replenishment lead time due to the variability of capacity in picking and in-house transportation. In these cases, self-adaptive (without human intervention) KANBAN is able to adjust material supply parameters for stabilizing the production output by avoiding material shortages while, at the same time, reducing on-hand inventory. 


## Value/Originality: 
The extant literature focuses on the number of KANBAN boxes deployed for a certain material. This number is static in the conventional KANBAN approach and variable in adaptive KANBAN. However, the second KANBAN parameter, the quantity of material per box, is seen as a constant in extant research. Our study presents an approach that uses both parameters as variables. This allows for a better adaptation to volatile production environments, because changing the quantity per box within the limits of its carrying capacity (1) does not put additional load on picking and in-house transportation and (2) allows for reducing inventory to a viable minimum while still working with the same general set-up, e.g. a two-box KANBAN.

## Research limitations/implications:
Data for this study has been collected from a simulation study, resembling SimCar, a lab-based manufacturing environment. More case-study research is required to test the approach in large-scale industrial applications. Furthermore, in essence, the self-adaptive approach is still reactive. For a proactive approach, it would be necessary to establish deep-learning algorithms on extensive data sets (including, but not limited to, availability and utilization of transportation and picking capacity) collected from the manufacturing environment.

