#include <bits/stdc++.h>
using namespace std;

bool isSafe(int row,int col,int n,
vector<string> &board,
map<pair<int,int>,string> &cordToColor,
map<string,bool> &isColored){
    pair<int,int> currpos={row,col};
    string colorOfCord=cordToColor[currpos];
    
    if(isColored[colorOfCord]) return false;

    int r=row;
    while(r--) if(board[r][col]=='X') return false;

    if(row>0 && col>0) if(board[row-1][col-1]=='X') return false;
    if(row>0 && col<n-1) if(board[row-1][col+1]=='X') return false;

    return true;

}

bool solve(
int row,
int n,
map<string,vector<pair<int,int>>> &colorToCord,
map<pair<int,int>,string> &cordToColor,
map<string,bool> &isColored,
vector<string> &board,
vector<vector<string>> &ans){

    if(row==n){
        ans.push_back(board);
        return true;
    }

    for(int c=0;c<n;c++){
        if(isSafe(row,c,n,board,cordToColor,isColored)){
            pair<int,int> currpos={row,c};
            string colorOfCord=cordToColor[currpos];
            board[row][c]='X';
            isColored[colorOfCord]=true;
            if(solve(row+1,n,colorToCord,cordToColor,isColored,board,ans)) return true;
            isColored[colorOfCord]=false;
            board[row][c]='.';
        }
    }
    return false;
}

int main() {
    map<string,vector<pair<int,int>>> colorToCord;
    colorToCord["blue"]={{2,5},{3,5}};
    colorToCord["grey"]={{3,1},{4,1}};
    colorToCord["brown"]={{0,0},{0,1},{0,2}};
    colorToCord["pink"]={{0,6},{1,6},{2,6},{3,6},{4,5},{4,6}};
    colorToCord["purple"]={{4,2},{4,3},{5,2},{5,3},{6,3}};
    colorToCord["yellow"]={{3,4},{4,4},{5,4},{5,5},{5,6},{6,4},{6,5},{6,6}};
    colorToCord["green"]={{0,3},{0,4},{0,5},{1,0},{1,1},{1,2},{1,3},{1,4},{1,5},{2,0},
    {2,1},{2,2},{2,3},{2,4},{3,0},{3,2},{3,3},{4,0},{5,0},{6,0},{5,1},{6,1},{6,2}};

    map<pair<int,int>,string> cordToColor;

    for(auto i : colorToCord) for(auto j : i.second) cordToColor[j]=i.first;

    map<string,bool> isColored;
    isColored["blue"]=false;
    isColored["grey"]=false;
    isColored["brown"]=false;
    isColored["pink"]=false;
    isColored["purple"]=false;
    isColored["yelllow"]=false;
    isColored["green"]=false;
    
    int n=7;

    vector<vector<string>> ans;
    vector<string> board(n);
    string str(n,'.');
    for(int i=0;i<n;i++) board[i]=str;

    solve(0,n,colorToCord,cordToColor,isColored,board,ans);

    vector<string> res;
    if(ans.size()>0) res=ans[0];

    for(auto i : res){
        for(auto j : i) cout << j << " ";
        cout << endl;
    }

    return 0;
}

