import numpy as np

def main():
    #### n is number of data samples
    #### T  is final time frame
    n = 500
    d = 1000
    T = 1.
    times = np.linspace(0., T, n)
    # print(len(times))
        
    ##change in timesteps
    dt = times[1] - times[0]
    # Bt2 - Bt1 ~ Normal with mean 0 variance t2 - t1
    dB = np.sqrt(dt) * np.random.normal(size=(n-1,d))
    B0 = np.zeros(shape=(1,d))
    B1 = []
    # for b in range(252):
    #     B1.append(100)
        
    # print(B0)    
    B = np.concatenate((B0, np.cumsum(dB, axis=0)) , axis=0)
    
    # print(B0)
    multiplier_list = []
    
    for i in range(n):
        multiplier_list.append(sum(B[i])/ 100)
    
    # for j in range(252):
    #     if j == 0:
    #         multiplier_list[j] *= 100
    #     else:
    #         multiplier_list[j] *= multiplier_list[j-1]
            
    # print({i+1:multiplier_list[i]  for i in range(n)})   
    return {i+1:multiplier_list[i]  for i in range(n)}
    
if __name__ == '__main__':
    main()
    