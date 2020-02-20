import { Box } from "../model/box";

/*

Bird is defined by its name: Hawk ('H') or Dove ('D'), and by its fitness.

*/

var Bird=function(name,fitness){
	this.name=name;
	this.fitness=fitness;
}

/*

HawkDove contains functionality to evolve a population of birds.

Attributes:

initial_hawk_ratio -- initial ratio of hawks.
population size    -- number of birds in the population.
initial_fitness    -- fitness of birds just born.
encounters         -- number of 2-bird contest encounters per generation.
value              -- value of a treat contested during an encounter.
cost               -- cost for hawk losing encounter to another hawk.
select             -- fraction of the most fit birds selected to breed.
evolution_rounds   -- number of rounds of evolution chosen.
mutation_rate      -- probability that a child of HH(DD) mutates to D(H).
population         -- population of Bird's.

*/

// quantity per Box = capacity
// number of box per material = 2

export class evolve{
    constructor(options){
        this.initial_hawk_ratio=initial_hawk_ratio
        this.population_size=population_size;
        this.initial_fitness=initial_fitness;
        this.encounters=encounters;
        this.value=value;
        this.cost=cost;
        this.select=select;
        this.evolution_rounds=evolution_rounds;
        this.mutation_rate=mutation_rate;
        this.population=[];
        this.parents=[];
        this.cumulative_parents_fitness=[];
        this.hawk_ratio_series=[];

        this.sigma = {}
        this.learning_ration = 0.3
    }
}


var HawkDove=function(initial_hawk_ratio,population_size,initial_fitness,
			encounters,value,cost,select,evolution_rounds,
			mutation_rate){

	// Attributes
	this.initial_hawk_ratio=initial_hawk_ratio
	this.population_size=population_size;
	this.initial_fitness=initial_fitness;
	this.encounters=encounters;
	this.value=value;
	this.cost=cost;
	this.select=select;
	this.evolution_rounds=evolution_rounds;
	this.mutation_rate=mutation_rate;
	this.population=[];
	this.parents=[];
	this.cumulative_parents_fitness=[];
	this.hawk_ratio_series=[];

	// Initialize a fresh population of birds. To be used
	// at the beginning of simulation. Each bird is created
	// as a hawk with this.initial_hawk_ratio probability.
	// Each bird is assigned the same initial fitness at birth.
	this.initializePopulation=function(){
		for(var i=0;i<this.population_size;++i){
			var new_name='D';
			var r=Math.random();
			if(r<this.initial_hawk_ratio)
				new_name='H';
			var new_bird=new Bird(new_name,this.initial_fitness);
			this.population.push(new_bird);
		}
	}

	// What happens during one encounter of two birds with 
	// given indexes, specifying them in the "population"
	// array. 
	this.one_encounter=function(bird_1_index,bird_2_index){
		//console.log(bird_1_index,bird_2_index,this.population.length,this.population[bird_1_index],this.population[bird_2_index]);
		var bird_1=this.population[bird_1_index].name;
		var bird_2=this.population[bird_2_index].name;
		if(bird_1=='H'&&bird_2=='H'){
			this.population[bird_1_index].fitness+=(this.value-this.cost)/2;
			this.population[bird_2_index].fitness+=(this.value-this.cost)/2;
		}
		else if(bird_1=='H'&&bird_2=='D'){
			this.population[bird_1_index].fitness+=this.value;
		}
		else if(bird_1=='D'&&bird_2=='H'){
			this.population[bird_2_index].fitness+=this.value;
		}
		else if(bird_1=='D'&&bird_2=='D'){
			this.population[bird_1_index].fitness+=this.value/2.0;
			this.population[bird_2_index].fitness+=this.value/2.0;
		}
	}

	// Search for index k of element of array A in the range [i,j)
	// for which A[k] is smaller than or equal to x, but such that
	// A[k+1] is larger than x (or such that k=j-1).
	this.binary_search=function(A,i,j,x){
		if(j==i+1||j==i){
			return i;
		}
		if(x<A[Math.floor((i+j)/2)])
			return this.binary_search(A,i,Math.floor((i+j)/2),x);
		else
			return this.binary_search(A,Math.floor((i+j)/2),j,x);
	}

	// Auxiliary function to select two distinct parents indexes.
	// It's essential that the probability to select a parent is
	// proprtional to its fitness, so that successful species 
	// (hawks or doves) can reproduce with probability also
	// proportionate to their fit score, not only their current
	// quantity in the population.
	this.select_two=function(){
		var r1=Math.random();
		var r2=Math.random();
		var i1=this.binary_search(this.cumulative_parents_fitness,0,this.cumulative_parents_fitness.length,r1);
		var i2=this.binary_search(this.cumulative_parents_fitness,0,this.cumulative_parents_fitness.length,r2);
		while(i2==i1){
			r2=Math.random();
			i2=this.binary_search(this.cumulative_parents_fitness,0,this.cumulative_parents_fitness.length,r2);
		}
		var ret=[this.parents[i1],this.parents[i2]];
		return ret;
	}

	// Select one number in the given range from 0 to N, 
	// inclusive 0 and exlusive N.
	this.select_one=function(N){
		var r=Math.random();
		return Math.floor(r*N);
	}

	// Return array which is a random sample without
	// replacement of [0,N).
	this.sample=function(N){
		var ret=[];
		for(var i=0;i<N;++i)
			ret.push(i);
		for(var i=0;i<N;++i){
			var j=this.select_one(N-i);
			var x=ret[N-1-i];
			ret[N-1-i]=ret[j];
			ret[j]=x;
		}
		return ret;
	}

	// Play "encounters" number of encounters between
	// the birds. In each encounter two birds are selected
	// and encounter via the "one_encounter" method.
	this.game=function(){
		for(var i=0;i<this.encounters;++i){
			var mix_population=this.sample(this.population_size);
			for(var j=0;j<Math.floor(this.population_size/2);++j){
				this.one_encounter(mix_population[j],mix_population[j+Math.floor(this.population_size/2)]);
			}
		}
	}

	// Auxiliary sorting method for the population of birds.
	// Implemented as MergeSort.
	this.sort=function(population){
		var half=Math.floor(population.length/2);
		if(half==0)
			return population;
		var left=this.sort(population.slice(0,half));
		var right=this.sort(population.slice(half,population.length));
		for(var i=population.length-1;i>=0;--i){
			if(left.length>0&&right.length>0
				&&left[left.length-1].fitness>right[right.length-1].fitness)
				population[i]=left.pop();
			else if(right.length>0)
				population[i]=right.pop();
			else
				population[i]=left.pop();
		}
		return population;
	}

	// Produce an offspring for two parent Bird's.
	this.produce_offspring=function(parent_1,parent_2){
		var r=Math.random();
		/*
		// Asexual reproduction, from just the first parent.
		// Comment out either asexual or sexual.
		if(r>=this.mutation_rate){
			var offspring=new Bird(parent_1.name,this.initial_fitness);
			return offspring;
		}
		else if(parent_1.name=='H'){
			var offspring=new Bird('D',this.initial_fitness);
			return offspring;
		}
		else if(parent_1.name=='D'){
			var offspring=new Bird('H',this.initial_fitness);
			return offspring;
		}
		*/
		// Sexual reproduction.
		// Comment out either asexual or sexual.
		if(parent_1.name==parent_2.name){
			if(r>=this.mutation_rate){// Two parents of the same kind produce same offspring
				var offspring=new Bird(parent_1.name,this.initial_fitness);
				return offspring;
			}
			else if(parent_1.name=='H'){
				var offspring=new Bird('D',this.initial_fitness);
				return offspring;
			}
			else if(parent_1.name=='D'){
				var offspring=new Bird('H',this.initial_fitness);
				return offspring;
			}
		}
		else if(parent_1.name!=parent_2.name){
			var fit_1=(parent_1.fitness+0.0001)/(parent_1.fitness+parent_2.fitness+0.0001);
			if(r<fit_1){
				var offspring=new Bird(parent_1.name,this.initial_fitness);
				return offspring;
			}
			else if(r>=fit_1){
				var offspring=new Bird(parent_2.name,this.initial_fitness);
				return offspring;
			}
		}
	}

	// Produces next generation of birds, by reproducing the most
	// fit birds of the current generation. 
	this.produce_next_generation=function(){
		this.population=this.sort(this.population);
		this.parents=[];
		this.cumulative_parents_fitness=[];
		number_of_parents=Math.floor(this.select*this.population_size);
		var tot_parent_fitness=0;
		var parents_fitness=[];
		for(var i=0;i<number_of_parents;++i){
			var parent=this.population[this.population_size-1-i];
			if(parent.fitness<0)
				break;
			this.parents.push(parent);
			parents_fitness.push(parent.fitness);
			tot_parent_fitness+=parent.fitness;
		}
		for(var i=0;i<this.parents.length;++i){
			parents_fitness[i]/=tot_parent_fitness;
		}
		this.cumulative_parents_fitness.push(0);
		for(var i=0;i<this.parents.length;++i){
			this.cumulative_parents_fitness.push(this.cumulative_parents_fitness[i]+
				parents_fitness[i]);
		}
		if(this.parents.length<2) // check that at least 2 fit parents exist
			console.log("Not enough fit parents!!!");
		var replenish=this.population_size-this.parents.length;
		var offsprings=[]
		for(var i=0;i<replenish;++i){
			var two=this.select_two();
			var parent_1=two[0];
			var parent_2=two[1];
			var offspring=this.produce_offspring(parent_1,parent_2);
			offsprings.push(offspring);
		}
		this.population=[];
		for(var i=0;i<this.parents.length;++i){
			this.parents[i].fitness=this.initial_fitness;
			this.population.push(this.parents[i]);
		}
		for(var i=0;i<offsprings.length;++i)
			this.population.push(offsprings[i]);
	}

	// Methods to calculate fraction of hawks in the population.
	this.calculate_fraction_of_hawks=function(){
		var hawks_counter=0;
		for(var i=0;i<this.population_size;++i)
			if(this.population[i].name=='H')
				hawks_counter++;
		return hawks_counter/this.population_size;
	}

	// Calculate mean of the second half of the list.
    this.mean=function(v){
        var ct=0;
        for(var i=v.length/2;i<v.length;++i)
            ct+=v[i];
        ct/=(v.length/2);
        return ct;
    }

	// Initialize and evolve the population. In the end print
	// the resulting population of hawks.
	this.evolve=function(){
		this.initializePopulation();
		for(var i=0;i<this.evolution_rounds;++i){
			var hawk_current_ratio=this.calculate_fraction_of_hawks();
			this.hawk_ratio_series.push(hawk_current_ratio);
			console.log("i="+i+" hawk/population="+hawk_current_ratio);
			this.game();
			this.produce_next_generation();
		}
		console.log(this.mean(this.hawk_ratio_series));
	}
}

/*

If value/cost>=1 the ESS is all hawks.

Else the ESS is value/cost fraction of population is hawks.

*/

var initial_hawk_ratio=0.5;
var population_size=100;
var initial_fitness=10000;
var encounters=10;
var value=1;
var cost=5;
var select=0.5;
var evolution_rounds=100;
var mutation_rate=0.0001;

var HawkDove=new HawkDove(initial_hawk_ratio,population_size,initial_fitness,
			encounters,value,cost,select,evolution_rounds,
			mutation_rate);
HawkDove.evolve();