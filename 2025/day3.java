import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class day3 {
    List<String> data;

    day3(String filePath) {
        this.data = processInput(filePath);
        // for(String d : data){
        // System.out.println(d);
        // }
    }

    private long totalJoltage2() {
        // so we need to find 12 batteries not 2
        // doing 12 for loops sounds horrible
        // Essentially we are trying to find the next biggest on RHS (with still being
        // able to include 12 batteries)
        // [biggest of][11 left]
        // [biggest of][10 left]
        // [biggest of][9 left]
        long totalSum = 0;
        for (String line : data) {
            int prev = 0; // this represents the previous max battery index (the range we can start the
                          // next search)
            List<Integer> res = new ArrayList<Integer>();
            long bankSum = 0;
            // loop for each battery
            for (int i = 0; i < 12; i++) {
                int lastAvailable = line.length() - (11 - i); // the last available index we can search 
                int[] findResult = findBiggest(prev, lastAvailable, line);
                res.add(findResult[0]);
                prev = findResult[1] + 1;

            }
            for (int i = 0; i < res.size(); i++) {
                bankSum += res.get(i) * Math.pow(10, 11 - i); // multiply the digit by its index such that first val is
                                                              // v*10^11
            }
            totalSum += bankSum;
        }
        return totalSum;
    }

    // j is exclusive
    private int[] findBiggest(int i, int j, String str) {
        int biggest = str.charAt(i) - '0';
        int index = i;
        for (int k = i; k < j; k++) {
            int val = str.charAt(k) - '0';

            if (val > biggest) {
                biggest = val;
                index = k;
            }
        }
        return new int[] { biggest, index };
    }

    // finds the max joltage per bank per line and sums results
    private int totalJoltage() {
        int totalSum = 0;
        for (String line : data) {
            // strat -> find the biggest num and then the next biggest afterwards
            int biggest = line.charAt(0) - '0';
            int startIDX = 1;
            // minus one makes sure we don't look at the last battery
            for (int i = 0; i < line.length() - 1; i++) {
                int val = line.charAt(i) - '0';
                if (val > biggest) {
                    biggest = val;
                    startIDX = i + 1;
                }
            }
            int secondBig = line.charAt(startIDX) - '0';
            // iterate over again but from start idx look ing for biuggest
            // System.out.println("start index: "+ startIDX);
            for (int i = startIDX; i < line.length(); i++) {
                int val = line.charAt(i) - '0';
                secondBig = Math.max(secondBig, val);
            }

            // System.out.println("biggest: " + biggest);
            // System.out.println("secondBig: " + secondBig);
            totalSum += biggest * 10 + secondBig;
        }

        return totalSum;
    }

    // returns array of strings (each string is a line)
    private List<String> processInput(String filePath) {
        List<String> data = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                data.add(line);
            }

        } catch (IOException e) {
            System.out.println(" There was an error reading in the data\n: " + e);
        }
        return data;

    }

    public static void main(String[] args) {
        System.out.println("ez");
        day3 d3 = new day3(args[0]);
        // d3.processInput(args[0]);
        System.out.println("Part 1, total Joltage: " + d3.totalJoltage());
        System.out.println("Part 2, total Joltage: " + d3.totalJoltage2());

    }
}

// javac day3.java
// java day3 day3.txt
